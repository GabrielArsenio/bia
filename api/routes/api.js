const express = require('express');
const router = express.Router();
const fs = require('fs');

const modelsPath = './models/';
var models = [];

fs.readdirSync(modelsPath)
    .forEach(file => models.push(file.replace('.js', '')));

router.param('resource', function (req, res, next) {
    if (models.indexOf(req.params.resource) < 0) {
        res.sendStatus(404);
    }
    next();
});

router.get('/:resource', function (req, res, next) {
    res.send('GET ' + req.params.resource);
});

router.get('/:resource/:id', function (req, res, next) {
    res.send('GET ' + req.params.resource + ' ID: ' + req.params.id);
});

router.post('/:resource', function (req, res, next) {
    res.send('POST ' + req.params.resource);
});

router.put('/:resource', function (req, res, next) {
    res.send('PUT ' + req.params.resource);
});

router.delete('/:resource', function (req, res, next) {
    res.send('DELETE ' + req.params.resource);
});

module.exports = router;