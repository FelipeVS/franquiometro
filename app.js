var express   = require('express');
var mongoose  = require('mongoose');
var fs        = require('fs');
var http      = require('http');
var config    = require('./config/config');
var root      = __dirname;
var app       = express();
var server    = null;

// This setups the database
require('./config/db')(config);

// Require all models
var modelsPath = __dirname + '/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});

require('./config/express')(app, config);

var server = http.createServer(app);
server.listen(config.port);
console.log('App started on port ' + config.port);


module.exports = app;
