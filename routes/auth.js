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
            res.sendStatus(401);
            return;
        }

        const token = jwt.sign(doc.toObject(), process.env.JWT_SECRET, { expiresIn: 300 }); // Seconds

        res.set('X-Access-Token', token).sendStatus(204);
    });
});

router.get('/:token', function (req, res, next) {
    jwt.verify(req.params.token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            res.status(403).send(err);
            return;
        }

        res.send(decoded);
    });
});

module.exports = router;