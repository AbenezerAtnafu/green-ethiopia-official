const { Op } = require("sequelize");
const multer = require("multer");
const path = require("path");
const AppError = require("../utils/AppError");
const Campaign = require("../models").Campaign;
const { catchAsync } = require("./error.controller");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/campaigns");
  },
  filename: function (req, file, cb) {
    const filename = `campaign-${Date.now()}${path.extname(file.originalname)}`;
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
exports.uploadCampaignImage = upload.array("images", 2);

exports.getAllCampaigns = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const offset = (page - 1) * limit;
  let options = {
    offset,
    limit,
    order: [['createdAt', 'DESC']],
    include: ["images"],
  };
 console.log("hey")
  const campaigns = await Campaign.findAll(options);
  
  res.status(200).json({
    status: "success",
    results: campaigns.length,
    campaigns,
  });
});

exports.getCampaign = catchAsync(async (req, res, next) => {
  const campaign = await campaign.findByPk(req.params.id, {
    include: ["images"],
  });
  if (!campaign) {
    return next(new AppError("Campaign with this ID does not exist", 404));
  }
  res.status(200).json({
    status: "success",
    campaign,
  });
});

exports.createCampaign = catchAsync(async (req, res, next) => {
  const campaign = await Campaign.create(req.body,{ include: ["images"] });
  res.status(201).json({
    status: "success",
    campaign,
  });
});

exports.updateCampaign = catchAsync(async (req, res, next) => {
  const campaign = await Campaign.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  if (!campaign[0]) {
    return next(new AppError("Campaign with this ID does not exist", 404));
  }
  res.status(200).json({
    status: "success",
    campaign,
  });
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
  res.status(204).json({
    status: "success",
    campaign,
  });
});
