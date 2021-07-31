var express = require("express");
var router = express.Router();
const PostController = require("../controlers/PostController");

router.post("/create/", PostController.newPostCreate);
router.get("/view-all-post/", PostController.allPost);
router.put("/add-comment/:postId", PostController.addComment);
router.put("/add-upVote/:postId", PostController.addUpVote);
router.put("/add-downVote/:postId", PostController.addDownVote);

module.exports = router;
