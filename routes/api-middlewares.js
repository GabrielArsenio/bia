const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const TOKEN_EXPIRES = 3000;

router.use(
    (req, res, next) => {
        jwt.verify(req.headers['x-access-token'], process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send(err);
                return;
            }
            
            delete decoded.exp
            delete decoded.iat
            
            const token = jwt.sign(decoded, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRES });
            res.header("X-Access-Token", token);

            next();
        });
    },
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    }
);

module.exports = router;