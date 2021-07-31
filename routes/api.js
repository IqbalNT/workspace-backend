var express = require("express");
var userRoute = require("./user-route");
var postRoute = require("./post-route");
var app = express();


app.use("/user/", userRoute);
app.use("/post/", postRoute);
module.exports = app;
