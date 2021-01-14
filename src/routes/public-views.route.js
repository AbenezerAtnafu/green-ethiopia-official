const express = require("express");
const {
    login,
    logout,
    renderLogin,
    renderHome,
    renderAbout,
    renderBlogs,
    renderBlog,
    renderCampaigns,
    renderCampaign,
    renderContactUs,
    renderMedia
} = require("../controllers/public-views.controller");
const router = express.Router();

router.get("/login",renderLogin);
router.post("/login", login);
router.get("/logout", logout);

router.get("/", renderHome);
router.get("/about", renderAbout);
router.get("/contact-us", renderContactUs);
router.get("/media", renderMedia);

router.get("/blogs", renderBlogs);
router.get("/blogs/:id", renderBlog);

router.get("/campaigns", renderCampaigns);
router.get("/campaigns/:id", renderCampaign);

module.exports = router;