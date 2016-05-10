var compression = require('compression');
// var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors');
// var router = express.Router();
var fs = require('fs');

module.exports = function(app, config) {
  app.use(compression());
  app.set('port', config.port);
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cookieParser());
};
