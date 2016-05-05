var express = require('express');
var router = express.Router();
var isps = require('../models/isps');

router.get('/', function(req, res, next) {
  isps.find({}, function(err, data) {
		if (err) {
			res.sendStatus(500);
		} else {
      console.log('data:', data);
			res.json(data);
		}
	});
});
router.get('/:id', function(req, res, next) {
  var query = { _id: req.params.id };
	isps.findOne(query, function(err, data) {
		if (err || data == null) {
			res.sendStatus(404);
		} else {
			res.json(data);
		}
	});
});
router.post('/', function(req, res, next) {
  var isp = new isps(req.body);
	isp.save(function(err, data) {
		console.log('Post data:', req.body);
		if (err) {
			res.status(400).json(err);
		} else {
			res.status(201).json(data);
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
