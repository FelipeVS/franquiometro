require("dotenv").config(); //gets local variables

var express   = require("express");
// var mongoose  = require("mongoose");
var fs        = require("fs");
var http      = require("http");
var config    = require("./config/config");
var root      = __dirname;
var path = require("path");
var app       = express();
var server    = null;


// Database setup
require("./config/db")(config);
// Express server setup
require("./config/express")(app, config);

// Require all api models
var modelsPath = __dirname + "/models";
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf(".js") >= 0) {
    require(modelsPath + "/" + file);
  }
});

// hold all individuals api routes
var api = {};
// require all routes
var routesPath = root + "/routes";
fs.readdirSync(routesPath).forEach(function (file) {
  if (file.indexOf(".js") >= 0) {
    var name = file.replace(/\.[^/.]+$/, "")
    api[name] = require(routesPath + "/" + name );
  }
});

// create all API routes
app.use("/api/", api.index);
app.use("/api/isps", api.isps);
app.use("/api/users", api.users);
// public angular content
app.use("/", express.static(path.join(root, "/public")));
// general error static page
app.use("/oops/", express.static(path.join(root, "/public/error")));
app.use(function(req, res, next) {
  res.status = 404;
  res.redirect('/oops/')
});

var server = http.createServer(app);
server.listen(config.port);
console.log(" // - - - - - Franquiômetro app started on port " + config.port + " - - - - - //");

module.exports = app;
