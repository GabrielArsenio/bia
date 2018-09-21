const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const usuarioSchema = require('../models/usuarios')
const usuarioModel = mongoose.model('usuarios', usuarioSchema)
const TOKEN_EXPIRES = 3000;

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post('/', (req, res, next) => {
    if (!req.body.login || !req.body.senha) {
        res.sendStatus(401);
        return;
    }

    usuarioModel.findOne(req.body, (err, doc) => {
        if (!doc) {
            res.sendStatus(401);
            return;
        }

        const token = jwt.sign(doc.toObject(), process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRES }); // Seconds

        res.set('X-Access-Token', token).sendStatus(204);
    });
});

router.get('/:token', (req, res, next) => {
    jwt.verify(req.params.token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).send(err);
            return;
        }

        usuarioModel.findById(decoded._id, (err, doc) => {
            if (!doc) {
                res.sendStatus(404);
                return;
            }

            const token = jwt.sign(doc.toObject(), process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRES });

            res.set('X-Access-Token', token).send(decoded);
        });
    });
});

module.exports = router;