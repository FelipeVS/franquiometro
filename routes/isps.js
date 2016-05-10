var express = require('express');
var router = express.Router();
var isps = require('../models/isps');

router.get('/', function(req, res, next) {
  isps.find({}, function(err, data) {
		if (err) {
			res.sendStatus(500);
		} else {
      // console.log('data:', data);
			res.json(data);
		}
	});
});
router.get('/:id', function(req, res, next) {
	isps.findById(req.params.id, function(err, data) {
		if (err || data == null) {
			res.sendStatus(404);
		} else {
      console.log( 'By ID:', data);
			res.json(data);
		}
	});
});
router.get('/:name', function(req, res, next) {
  console.log(req.params.name)
  var query = { 'name': req.params.name };
	isps.find(query, function(err, data) {
		if (err || data == null) {
			res.sendStatus(404);
		} else {
      console.log( query + ':', data);
			res.json(data);
		}
	});
});
router.post('/', function(req, res, next) {
  console.log(req.body.name, req.body.plans);
  var isp = new isps(req.body);
	isp.save(function(err, isp) {
		console.log('Post data:', isp);
		if (err) {
			res.status(400).json(err);
		} else {
			res.status(201).json(isp);
		}
	});
});
router.put('/isps/:id', function(req, res, next) {
  var query = { _id: req.params.id };
	var mod = req.body;
	delete mod._id;

	isps.update(query, mod, function(err, data) {
		if (err) {
			res.status(400).json(err);
		} else {
			res.json(data);
		}
	});
});
router.delete('/:id', function(req, res, next) {
  var query = { _id: req.params.id };

	isps.remove(query, function(err, data) {
		if (err) {
			res.status(400).json(err);
		} else {
			res.json(data);
		}
	});
});

module.exports = router;
