const express = require("express");
const {
    getAllCampaigns,
    getCampaign,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    uploadCampaignImage
} = require("../controllers/campaign.controller");
 const router = express.Router();

router.route("/")
    .get(getAllCampaigns)
    .post(uploadCampaignImage,createCampaign);

router.route("/:id")
    .get(getCampaign)
    .patch(updateCampaign)
    .delete(deleteCampaign);

module.exports = router;