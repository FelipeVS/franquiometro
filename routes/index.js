var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Franquiometro API v1. Criado por Felipe Veloso. Uso privado e restrito. Sai fora!');
});

module.exports = router;
