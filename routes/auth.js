const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const usuarioSchema = require('../models/usuarios')
const usuarioModel = mongoose.model('usuarios', usuarioSchema)

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post('/', function (req, res, next) {
    usuarioModel.findOne(req.body, function (err, doc) {
        if (!doc) {
            res.sendStatus(404);
            return;
        }

        const token = jwt.sign({ _id: doc.id }, 'senha', {
            expiresIn: 300 // expires in 5min
        });

        res.set('X-Access-Token', token).sendStatus(204);
    });
});

module.exports = router;