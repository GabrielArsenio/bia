const mongoose = require('mongoose');
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
    var tempSchema = {};
    var tempModel = {};
    var tempDocument = {};

    tempSchema[req.params.resource] = require('../models/' + req.params.resource);
    tempModel[req.params.resource] = mongoose.model(req.params.resource, tempSchema[req.params.resource]);
    tempDocument = new tempModel[req.params.resource](req.body);

    tempDocument
        .save()
        .then((product) => res.location('/api/' + req.params.resource + '/' + product._id).sendStatus(201));
});

router.put('/:resource', function (req, res, next) {
    res.send('PUT ' + req.params.resource);
});

router.delete('/:resource', function (req, res, next) {
    res.send('DELETE ' + req.params.resource);
});

module.exports = router;