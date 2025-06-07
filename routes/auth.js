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

    try {
        const user = await usuarioModel.findOne(req.body);
        if (!user) {
            return res.sendStatus(401);
        }

        const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRES }); // Seconds
        res.set('X-Access-Token', token).sendStatus(204);

    } catch (error) {
        console.error("Error in POST /auth:", error);
        // Pass error to Express error handler or send a generic server error
        return next(error); // Or res.status(500).send('Internal Server Error');
    }
});

router.get('/:token', (req, res, next) => {
    jwt.verify(req.params.token, process.env.JWT_SECRET, async (err, decoded) => { // Made callback async
        if (err) {
            return res.status(403).send(err); // Added return
        }

        try {
            const user = await usuarioModel.findById(decoded._id);
            if (!user) {
                return res.sendStatus(404); // Added return
            }

            const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRES });
            res.set('X-Access-Token', token).send(decoded);

        } catch (error) {
            console.error("Error in GET /auth/:token:", error);
            if (error.name === 'CastError') {
                 return res.status(400).json({ message: 'Invalid user ID format in token', error: error });
            }
            // Pass error to Express error handler or send a generic server error
            return next(error); // Or res.status(500).send('Internal Server Error');
        }
    });
});

module.exports = router;