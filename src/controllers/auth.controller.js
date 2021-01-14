const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const bcrypt = require("bcryptjs");

const User = require("../models").users;
const AppError = require("../utils/AppError");
const { catchAsync } = require("./error.controller");

const getToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Email or Password missing", 400));
  }

  const user = await User.findOne({ where: { email} })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Invalid Email or Password", 401));
  }
  const token = getToken(user.id);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.verifyUser = catchAsync(async (req, res, next) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("Your not logged in", 401));
  }

  const { id } = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);

  const user = await User.findByPk(id);
  if (!user) {
    return next(
      new AppError("The user related to the token no longer exists", 401)
    );
  }

  req.user = user;
  next();
});
