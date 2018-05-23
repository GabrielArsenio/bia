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
    const resourceName = req.params.resource;

    var schema = require('../models/' + resourceName);
    var collectionModel = mongoose.model(resourceName, schema);

    collectionModel.find(null, function (err, doc) {
        res.send(doc);
    });
});

router.get('/:resource/:id', function (req, res, next) {
    const resourceName = req.params.resource;

    var schema = require('../models/' + resourceName);
    var collectionModel = mongoose.model(resourceName, schema);

    collectionModel.findById(req.params.id, function (err, doc) {
        if (!doc) {
            res.status(404).send();
            return;
        }

        res.send(doc.toJSON());
    });
});

router.post('/:resource', function (req, res, next) {
    const resourceName = req.params.resource;

    var schema = require('../models/' + resourceName);
    var collectionModel = mongoose.model(resourceName, schema);
    var document = new collectionModel(req.body);

    document.save({ validateBeforeSave: true }, function (err, doc) {
        if (err) {
            res.status(400).json(err);
            return;
        }

        res.location('/api/' + resourceName + '/' + doc._id).sendStatus(201);
    });
});

router.put('/:resource/:id', function (req, res, next) {
    const resourceName = req.params.resource;

    var schema = require('../models/' + resourceName);
    var collectionModel = mongoose.model(resourceName, schema);

    collectionModel.findByIdAndUpdate(req.params.id, req.body, function (err, doc) {
        if (!doc) {
            res.status(404).send();
            return;
        }

        res.sendStatus(204);
    });
});

router.delete('/:resource/:id', function (req, res, next) {
    const resourceName = req.params.resource;

    var schema = require('../models/' + resourceName);
    var collectionModel = mongoose.model(resourceName, schema);

    collectionModel.findByIdAndDelete(req.params.id, function (err, doc) {
        if (!doc) {
            res.status(404).send();
            return;
        }

        res.sendStatus(204);
    });
});

module.exports = router;