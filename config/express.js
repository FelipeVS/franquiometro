var compression = require('compression');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
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
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());


  // hold all individuals routes
  var api = {};
  // require all routes
  var routesPath = __dirname + './../routes';
  fs.readdirSync(routesPath).forEach(function (file) {
    if (file.indexOf('.js') >= 0) {
      var name = file.replace(/\.[^/.]+$/, "")
      api[name] = require(routesPath + '/' + name );
    }
  });

  // create all API routes
  app.use('/api/', api.index);
  app.use('/api/isps', api.isps);
  app.use('/api/users', api.users);


  app.use('/', express.static(path.join(__dirname, '../public')));

  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.send('Nada aqui!')
    next(err);
  });
};
