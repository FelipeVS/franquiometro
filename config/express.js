var compression = require("compression");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cors = require("cors");
var path = require("path");
var fs = require("fs");

module.exports = function(app, config) {
  app.use(compression());
  app.set("port", config.port);
  app.use(favicon(path.join(__dirname, "..", "public", "favicon.ico")));
  app.use(logger("dev"));
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json( {strict:false} ))
  app.use(cookieParser());
};
