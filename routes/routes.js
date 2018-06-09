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

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

router.get('/:resource', function (req, res, next) {
    let collectionModel = createCollectionModel(req.params.resource);

    collectionModel.find(null, function (err, doc) {
        res.send(doc);
    });
});

router.get('/:resource/:id', function (req, res, next) {
    let collectionModel = createCollectionModel(req.params.resource);

    collectionModel.findById(req.params.id, function (err, doc) {
        if (doc) {
            res.send(doc.toJSON());
        } else {
            res.sendStatus(404);
        }
    });
});

router.post('/:resource', function (req, res, next) {
    let collectionModel = createCollectionModel(req.params.resource);
    var document = new collectionModel(req.body);

    document.save({ validateBeforeSave: true }, function (err, doc) {
        if (doc) {
            res
                .location('/api/' + req.params.resource + '/' + doc._id)
                .status(201)
                .send(doc);
        } else {
            res.status(400).json(err);
        }
    });
});

router.put('/:resource/:id', function (req, res, next) {
    let collectionModel = createCollectionModel(req.params.resource);

    collectionModel.findByIdAndUpdate(req.params.id, req.body, function (err, doc) {
        res.sendStatus(doc ? 204 : 404);
    });
});

router.delete('/:resource/:id', function (req, res, next) {
    let collectionModel = createCollectionModel(req.params.resource);

    collectionModel.findByIdAndDelete(req.params.id, function (err, doc) {
        res.sendStatus(doc ? 204 : 404);
    });
});

function createCollectionModel(resourceName) {
    var schema = require('../models/' + resourceName);
    var collectionModel = mongoose.model(resourceName, schema);

    return collectionModel;
}

module.exports = router;