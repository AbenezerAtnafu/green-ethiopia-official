exports.catchAsync = (controller) => {
  return (req, res, next) => {
    controller(req, res, next).catch(next);
  };
};

const developmentError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
const productionError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR:: ", err);
    res.status(err.statusCode).json({
      status: err.status,
      message: "Oops, something went wrong!",
    });
  }
};

exports.errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    developmentError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    productionError(err, res);
  }

  next();
};
