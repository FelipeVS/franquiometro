var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var databaseUrl = 'mongodb://admin:user-admin@ds021741.mlab.com:21741/franquiometro';

/* GET isps listing. */
router.get('/', function(req, res, next) {
  MongoClient.connect(databaseUrl, function(err, db) {
    if (err) {
      throw err;
    }
    db.collection('isp').find().toArray(function(err, result) {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  });
});
/* POST isps listing. */
router.post('/', function(req, res, next) {
  MongoClient.connect(databaseUrl, function(err, db) {
    if (err) {
      throw err;
    }
    db.isp.insert(req.body, function(err, doc) {
      if (err) {
        throw err;
      }
      res.JSON(doc);
    });
  });
});

module.exports = router;
