const {
  Op
} = require("sequelize");
const Blog = require("../models").Blog;
const Campaign = require("../models").Campaign;
const User = require("../models").users;
const {
  catchAsync
} = require("./error.controller");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


// static views render
exports.renderHome = catchAsync(async (req, res, next) => {
  console.log("error");
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 4;
  const offset = (page - 1) * limit;
  let options = {
    offset,
    limit,
    order: [
      ['createdAt', 'DESC']
    ],
    include: ["images"]
  }
  
  const campaigns = await Campaign.findAll(options);
  res.render("guests/index", {
    campaigns,
    query: req.query.q,
    page,
  });
});

exports.renderAbout = catchAsync(async (req, res, next) => {
  res.render("guests/about");
});

exports.renderContactUs = catchAsync(async (req, res, next) => {
  res.render("guests/contact-us");
});

exports.renderMedia = catchAsync(async (req, res, next) => {
  res.render("guests/media");
});



//dynamic views render
exports.renderBlogs = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const offset = (page - 1) * limit;
  let options = {
    offset,
    limit,
    order: [
      ['createdAt', 'DESC']
    ],
    include: ["images", "sources"]
  }
  const blogs = await Blog.findAll(options);
  res.render("guests/blogs", {
    blogs,
    query: req.query.q,
    page,
    months,
  });
});

exports.renderBlog = catchAsync(async (req, res, next) => {

  const blog = await Blog.findByPk(req.params.id, {
    include: ["images", "sources"],
  });

  res.render("guests/blog", {
    blog,
    months,
  });
})

exports.renderCampaigns = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const offset = (page - 1) * limit;
  let options = {
    offset,
    limit,
    order: [
      ['createdAt', 'DESC']
    ],
    include: ["images"]
  }
  const campaigns = await Campaign.findAll(options);

  res.render("guests/campaigns", {
    campaigns,
    query: req.query.q,
    page,
    months,
  });
});

exports.renderCampaign = catchAsync(async (req, res, next) => {
  const campaign = await Campaign.findByPk(req.params.id, {
    include: ["images"],
  });
  res.render("guests/campaign", {
    campaign,
    months,
  })
})

// login and logout
exports.renderLogin = catchAsync(async (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("/admin/blogs");
  } else {
    res.render("guests/login", {
      error: null,
    });
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !user.validPassword(password)) {
    res.render("guests/login", {
      error: "Invalid email/password",
    });
  } else {
    req.session.user = user.dataValues;
    res.redirect("/admin/blogs");
  }
});
exports.logout = catchAsync(async (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});