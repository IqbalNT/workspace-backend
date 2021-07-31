var express = require("express");
var router = express.Router();
const UserController = require("../controlers/UserController");

router.post("/signup/", UserController.userSignup);
router.post("/signin/", UserController.userSignin);

module.exports = router;
