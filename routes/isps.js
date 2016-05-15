var express = require('express');
var router = express.Router();
var isps = require('../models/isps');

router.get('/', function(req, res, next) {
  params = req.query || {}
  isps.find(params, function(err, data) {
		if (err) {
			res.sendStatus(500);
		} else {
      // console.log('data:', data);
			res.json(data);
		}
	});
});
// router.get('/:id', function(req, res, next) {
// 	isps.findById(req.params.id, function(err, data) {
// 		if (err || data == null) {
// 			res.sendStatus(404);
// 		} else {
//       console.log( 'By ID:', data);
// 			res.json(data);
// 		}
// 	});
// });
router.post('/', function(req, res, next) {
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
router.put('/', function(req, res, next) {
  var content = new isps(req.body);
  delete content["_id"]
  var query = { name: req.query };

  console.log(JSON.stringify(req.params, req.query));
  console.log('UPDATE', content, query);

  isps.findOne(query, function (err, isps) {
    console.log(isps);
    if (isps) {
      isps.name = content.name;
      isps.plans.push(content.plans) // CRIAR FUNÇÂO PARA VERIFICAR SE JÀ EXISTE PLANO
      isps.save(function (err) {
        if (err) {
    			res.status(400).json(err);
    		} else {
    			res.status(201).json(isps);
    		}
      });
    } else {
      res.status(400).json(err);
    }

  });

});

router.delete('/', function(req, res, next) {
  var query = { name: req.query.name };
	isps.remove(query, function(err, data) {
		if (err) {
			res.status(400).json(err);
		} else {
			res.json(data);
		}
	});
});

module.exports = router;
