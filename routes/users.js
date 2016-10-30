var express = require("express");
var router = express.Router();
var users = require("../models/users");

// find all songs route
router.get("/", function(req, res, next) {
  users.find({}, function(err, data) {
		if (err) {
			res.sendStatus(500);
		} else {
			res.json(data);
		}
	});
});
router.get("/:id", function(req, res, next) {
  var query = { _id: req.params.id };
	users.findOne(query, function(err, data) {
		if (err || data == null) {
			res.sendStatus(404);
		} else {
			res.json(data);
		}
	});
});
router.post("/", function(req, res, next) {
  var user = new users(req.body);
	user.save(function(err, user) {
		console.log(user);
		if (err) {
			res.status(400).json(err);
		} else {
			res.status(201).json(user);
		}
	});
});
router.put("/:id", function(req, res, next) {
  var query = { _id: req.params.id };
	var mod = req.body;
	delete mod._id;

	users.update(query, mod, function(err, data) {
		if (err) {
			res.status(400).json(err);
		} else {
			res.json(data);
		}
	});
});
router.delete("/:id", function(req, res, next) {
  var query = { _id: req.params.id };

	users.remove(query, function(err, data) {
		if (err) {
			res.status(400).json(err);
		} else {
			res.json(data);
		}
	});
});

module.exports = router;
