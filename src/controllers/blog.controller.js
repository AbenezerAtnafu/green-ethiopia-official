const { Op } = require("sequelize");
const multer = require("multer");
const path = require("path");
const AppError = require("../utils/AppError");
const Blog = require("../models").Blog;
const { catchAsync } = require("./error.controller");

const months = ["Jan", "Feb", "Mar", "Apr", "May" ,"Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/blogs");
  },
  filename: function (req, file, cb) {
    const filename = `blog-${Date.now()}${path.extname(file.originalname)}`;
    if (!req.body.images) {
      req.body.images = [
        {
          url: filename,
        },
      ];
    } else {
      req.body.images.push({
        url: filename,
      });
    }
    cb(null, filename);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Invalid Image or Image Format", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadBlogImage = upload.array("images", 6);

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const offset = (page - 1) * limit;
  let options = {
    offset,
    limit,
    order: [['createdAt', 'DESC']],
    include: ["images", "sources"],
  };
  const blogs = await Blog.findAll(options);
  
  res.status(200).json({
    status: "success",
    results: blogs.length,
    blogs,
    months,
  });
  
});

exports.getBlog = catchAsync(async (req, res, next) => {
  const blog = await blog.findByPk(req.params.id, {
    include: ["images", "sources"],
  });
  if (!blog) {
    return next(new AppError("Blog with this ID does not exist", 404));
  }
  res.status(200).json({
    status: "success",
    blog,
    months,
  });
});

exports.createBlog = catchAsync(async (req, res, next) => {
  //req.body.sources = JSON.parse(req.body.sources)
  const blog = await Blog.create(req.body,{ include: ["images", "sources"] });
  res.status(201).json({
    status: "success",
    blog,
  });
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  if (!blog[0]) {
    return next(new AppError("Blog with this ID does not exist", 404));
  }
  res.status(200).json({
    status: "success",
    blog,
  });
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!blog) {
    return next(new AppError("Blog with this ID does not exist", 404));
  }
  res.status(204).json({
    status: "success",
    blog,
  });
});
