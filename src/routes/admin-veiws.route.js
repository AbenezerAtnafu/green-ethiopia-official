const express = require("express");

const {
    sessionChecker,
    renderBlogs,
    renderCreateBlog,
    createBlog,
    renderEditBlog,
    editBlog,
    deleteBlog,
    uploadBlogImage,
    renderCampaigns,
    renderCreateCampaign,
    createCampaign,
    renderEditCampaign,
    editCampaign,
    deleteCampaign,
    uploadCampaignImage,
    renderUsers,
    renderCreateUser,
    createUser,
    deleteUser,
} = require("../controllers/admin-views.controller");
const router = express.Router();

// user routes
router.get("/users", sessionChecker,renderUsers);
router.get("/users/create", sessionChecker,renderCreateUser);
router.post("/users/create", sessionChecker,createUser);
router.get("/users/delete:id", sessionChecker,deleteUser);

/**
 * Blog routes
*/
router.get("/blogs", sessionChecker,renderBlogs);
router.get("/blogs/create", sessionChecker,renderCreateBlog);
router.post("/blogs/create",sessionChecker, uploadBlogImage, createBlog);
router.get("/blogs/edit:id",sessionChecker, renderEditBlog);
router.post("/blogs/edit:id", sessionChecker,editBlog);
router.get("/blogs/delete:id",sessionChecker, deleteBlog);

/*
 * Campaign Routes 
*/ 
router.get("/campaigns", sessionChecker,renderCampaigns);
router.get("/campaigns/create",sessionChecker, renderCreateCampaign);
router.post("/campaigns/create",sessionChecker, uploadCampaignImage, createCampaign);
router.get("/campaigns/edit:id",sessionChecker, renderEditCampaign);
router.post("/campaigns/edit:id", sessionChecker,editCampaign);
router.get("/campaigns/delete:id",sessionChecker, deleteCampaign);



module.exports = router;