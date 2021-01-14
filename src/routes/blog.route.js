const express = require("express");
const {
    getAllBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    uploadBlogImage
} = require("../controllers/blog.controller");
 const router = express.Router();

router.route("/")
    .get(getAllBlogs)
    .post(uploadBlogImage,createBlog);

router.route("/:id")
    .get(getBlog)
    .patch(updateBlog)
    .delete(deleteBlog);

 module.exports = router;