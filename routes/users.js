var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

/* GET users listing. */
router.get('/', function(req, res, next) {
  MongoClient.connect('mongodb://admin:user-admin@ds021741.mlab.com:21741/franquiometro', function(err, db) {
    if (err) {
      throw err;
    }
    db.collection('users').find().toArray(function(err, result) {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  });
});

module.exports = router;
