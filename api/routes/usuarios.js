var express = require('express');
var router = express.Router();
var usuarioSchema = require('../models/usuario');

router.get('/', function(req, res, next) {
  res.send('usuarios');
});

module.exports = router;