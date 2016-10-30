var express = require("express");
var router = express.Router();
var isps = require("../models/isps");

router.get("/", function(req, res, next) {
    query = req.query || {}
    isps.find(query, function(err, data) {
    	if (err || data===null) {
            console.log("===> GET ERROR", err, "\n", query);
            res.sendStatus(404);
    	} else {
            console.log("===> GET SUCCESSFUL", data);
            res.json(data);
    	}
    });
});
// router.get('/:id', function(req, res, next) {
// 	isps.findById(req.params.id, function(err, data) {
// 		if (err || data == null) {
// 			res.sendStatus(404);
// 		} else {
//       console.log( 'By ID:'  , data);
// 			res.json(data);
// 		}
// 	});
// });
router.post("/", function(req, res, next) {
  var isp = new isps(req.body);
	isp.save(function(err, isp) {
		if (err) {
            console.log("===> POST ERROR", err, "\n", isp);
    		res.status(400).json(err);
		} else {
            console.log("===> POST SUCCESSFUL", isp);
            res.status(201).json(isp);
		}
	});
});

router.put("/", function(req, res, next) {
    var content = new isps(req.body);
    var query = req.query;

    // console.log('===> UPDATE', content, query);

    isps.findOne(query, function (err, isp) {
        if (isp) {
            console.log(isp);

            isp.name = content.name;
            if (content.plans.length!=0) {
                console.log(isp.plans)
                console.log("PUSHING", content.plans)
                isp.plans = content.plans // CRIAR FUNÇÂO PARA VERIFICAR SE JÀ EXISTE PLANO
            }
            isp.save(function (err) {
                if (err) {
                        console.log("===> UPDATE ERROR ON SAVE", err, "\n", query, "\n", isp);
                		res.status(400).json(err);
                	} else {
                        console.log("===> UPDATE SUCCESSFUL", isp);
                		res.status(201).json(isp);
                	}
            });
        } else {
            console.log("===> UPDATE ERROR ON FIND", err, "\n", query)
            res.status(400).json(err);
        }
    });
});

router.delete("/", function(req, res, next) {
  var query = req.query;
	isps.remove(query, function(err, data) {
		if (err) {
            console.log("===> DELETE ERROR", err, "\n", query);
			res.status(400).json(err);
		} else {
            console.log("===> DELETE SUCCESSFUL", data);
			res.json(data);
		}
	});
});

module.exports = router;
