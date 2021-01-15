const url = require("url");
const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize");
const Blog = require("../models").Blog;
const Campaign = require("../models").Campaign;
const User = require("../models").users;
const BlogSource  = require("../models").BlogSource;
const AppError = require("../utils/AppError");
const { catchAsync } = require("./error.controller");
let moment = require('moment');

const multerBlogStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/blogs");
    },
    filename: function (req, file, cb) {
        const filename = `blog-${Date.now()}${path.extname(
        file.originalname
        )}`;
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

const multerCampaignStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/campaigns");
    },
    filename: function (req, file, cb) {
        const filename = `campaign-${Date.now()}${path.extname(
        file.originalname
        )}`;
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

const uploadBlog = multer({
    storage: multerBlogStorage,
    fileFilter: null,
  });

const uploadCampaign = multer({
    storage: multerCampaignStorage,
    fileFilter: null,
});

exports.uploadBlogImage = uploadBlog.array("images", 6);
exports.uploadCampaignImage = uploadCampaign.array("images", 6);

exports.sessionChecker = (req, res, next) => {
  if (!req.session.user || !req.cookies.user_sid) {
    res.redirect("/login");
  } else {
    next();
  }
};
/*
 * Users Section
*/ 
exports.renderUsers = catchAsync(async(req, res,next) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const offset = (page - 1) * limit;
    let options = {
        offset,
        limit,
        where: {
          email: {
            [Op.ne]: "super@green.com",
          },
        },
    };
    const users = await User.findAll(options);
        res.render("admin/users", {
        users,
        page,
        success: req.query.success,
    });
});

exports.renderCreateUser = catchAsync(async (req, res, next) => {
    res.render("admin/create-user", {
      success: null,
    });
  });
  
  exports.createUser = catchAsync(async (req, res, next) => {
    await User.create(req.body);
    res.redirect(
      url.format({
        pathname: "/admin/users",
        query: {
          success: "User successfully created!",
        },
      })
    );
  });
  
  exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      return next(new AppError("Vehicle with this ID does not exist", 404));
    }
    res.redirect(
      url.format({
        pathname: "/admin/users",
        query: {
          success: "User successfully deleted!",
        },
      })
    );
  });

/**
 * Blogs Section
*/

exports.renderBlogs = catchAsync(async (req, res, next) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const offset = (page - 1) * limit;
    let options = {
      offset,
      limit,
      include: ["images", "sources"],
    };
    const blogs = await Blog.findAll(options);
    res.render("admin/blogs", {
      blogs,
      page,
      success: req.query.success,
    });
});

exports.renderCreateBlog = catchAsync(async (req, res, next) => {
    res.render("admin/create-blog", {
      success: null,
    });
  });

exports.createBlog = catchAsync(async (req, res, next) => {
 
  if (!req.body.source_titles) {
    req.body.sources.pop();
    } else {
      req.body.sources.pop();
      req.body.source_titles.forEach((source_title, index) => {
        req.body.source_urls.forEach((url, urlIndex) => {
          if(index === urlIndex){
            req.body.sources.push({
              source_title: source_title,
              source_url:url,
            });
          }
        })
      });
  }

    await Blog.create({ ...req.body }, { include: ["images", "sources"] });
    res.redirect(
      url.format({
        pathname: "/admin/blogs",
        query: {
          success: "Blog successfully created!",
        },
      })
    );
  });

exports.renderEditBlog = catchAsync(async (req, res, next) => {
  
    const blog = await Blog.findByPk(req.params.id, {
      include:["sources"],
    });
    res.render("admin/edit-blog", {
        success: null,
        blog,
    });
});

exports.editBlog = catchAsync(async (req, res, next) => {
  if (!req.body.source_titles) {
    req.body.sources.pop();
    } else {
      req.body.sources.pop();
      req.body.source_titles.forEach((source_title, index) => {
        req.body.source_urls.forEach((url, urlIndex) => {
          if(index === urlIndex){
            req.body.sources.push({
              source_title: source_title,
              source_url:url,
              blog_id:req.params.id,
            });
          }
        })
      });
  }
    await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    await BlogSource.destroy({
      where:{
        blog_id: req.params.id,
      }
    })

    await BlogSource.bulkCreate(req.body.sources);

    res.redirect(
      url.format({
        pathname: "/admin/blogs",
        query: {
          success: "Blog successfully updated!",
        },
      })
    );
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
    res.redirect(
      url.format({
        pathname: "/admin/blogs",
        query: {
          success: "Blog successfully deleted!",
        },
      })
    );
  });

/**
 * Campaigns Section
 */ 
exports.renderCampaigns = catchAsync(async (req, res, next) => {
    
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const offset = (page - 1) * limit;
    let options = {
      offset,
      limit,
      include: ["images"],
    };
    const campaigns = await Campaign.findAll(options);
    res.render("admin/campaigns", {
      campaigns,
      page,
      success: req.query.success,
    });
});

exports.renderCreateCampaign = catchAsync(async (req, res, next) => {
    res.render("admin/create-campaign", {
      success: null,
    });
  });

exports.createCampaign = catchAsync(async (req, res, next) => {
  let campaign_duration = req.body.datetimes.split(' - ');
  var start_date_object = moment(campaign_duration[0], "DD/MM/YYYY"); // 1st argument - string, 2nd argument - format
  var end_date_object = moment(campaign_duration[1], "DD/MM/YYYY"); // convert moment.js object to Date object
  req.body.start_date = start_date_object.toString();
  req.body.end_date = end_date_object.toString();
    await Campaign.create({ ...req.body }, { include: ["images"] });
    res.redirect(
      url.format({
        pathname: "/admin/campaigns",
        query: {
          success: "Campaign successfully created!",
        },
      })
    );
  });

exports.renderEditCampaign = catchAsync(async (req, res, next) => {
    const campaign = await Campaign.findByPk(req.params.id);
    res.render("admin/edit-campaign", {
        success: null,
        campaign,
    });
});

exports.editCampaign = catchAsync(async (req, res, next) => {
  console.log(req.body);
  let campaign_duration = req.body.datetimes.split(' - ');
  var start_date_object = moment(campaign_duration[0], "DD/MM/YYYY"); // 1st argument - string, 2nd argument - format
  var end_date_object = moment(campaign_duration[1], "DD/MM/YYYY"); // convert moment.js object to Date object
  req.body.start_date = start_date_object.toString();
  req.body.end_date = end_date_object.toString();
    await Campaign.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.redirect(
      url.format({
        pathname: "/admin/campaigns",
        query: {
          success: "Campaign successfully updated!",
        },
      })
    );
  });



  exports.deleteCampaign = catchAsync(async (req, res, next) => {
    const campaign = await Campaign.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!campaign) {
      return next(new AppError("Campaign with this ID does not exist", 404));
    }
    res.redirect(
      url.format({
        pathname: "/admin/campaigns",
        query: {
          success: "Campaign successfully deleted!",
        },
      })
    );
  });
