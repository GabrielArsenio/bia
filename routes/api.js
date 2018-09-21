const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const TOKEN_EXPIRES = 3000;

const resources = [];
const schemas = [];
const models = [];

fs.readdirSync('./models/')
    .forEach(file => {
        const resourceName = file.replace('.js', '')
        const schema = require(`../models/${resourceName}`)
        const model = mongoose.model(resourceName, schema)

        resources.push(resourceName);
        schemas.push(schema);
        models.push(model);
    });

router.param('resource', (req, res, next) => {
    if (resources.indexOf(req.params.resource) < 0) {
        res.sendStatus(404);
    }
    next();
});

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

router.get('/:resource', (req, res, next) => {
    const model = createModel(req.params.resource);

    model
        .find(null, (err, doc) => {
            res.send(doc);
        })
        .populate(getPopulateList(req.params.resource))
        .exec(() => { console.log(arguments) });
});

router.get('/:resource/:id', (req, res, next) => {
    const model = createModel(req.params.resource);

    model
        .findById(req.params.id, (err, doc) => {
            if (doc) {
                res.send(doc.toJSON());
            } else {
                res.sendStatus(404);
            }
        })
        .populate(getPopulateList(req.params.resource))
        .exec(() => { console.log(arguments) });
});

router.post('/:resource', (req, res, next) => {
    const model = createModel(req.params.resource);
    const documents = [].concat(req.body)

    new Promise(
        (resolve, reject) => {
            for (const doc of documents) {
                const err = new model(doc).validateSync()
                if (err) {
                    reject(err);
                    return;
                }
            }

            resolve();
        })
        .then(() => {
            model.create(req.body, (err, docs) => {
                if (docs) {
                    res.status(201).send(docs);
                } else {
                    res.status(400).json(err);
                }
            });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.put('/:resource/:id', (req, res, next) => {
    const model = createModel(req.params.resource);

    model.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
        res.sendStatus(doc ? 204 : 404);
    });
});

router.delete('/:resource/:id', (req, res, next) => {
    const model = createModel(req.params.resource);

    model.findByIdAndDelete(req.params.id, (err, doc) => {
        res.sendStatus(doc ? 204 : 404);
    });
});

function createModel(resourceName) {
    const indexResource = resources.indexOf(resourceName);
    const model = models[indexResource];
    return model;
}

function getPopulateList(resourceName) {
    const indexResource = resources.indexOf(resourceName);
    const schema = schemas[indexResource];
    const populateList = [];

    Object.keys(schema.obj).forEach((propName) => {
        const prop = schema.obj[propName];

        if (typeof prop === 'object' && schema.obj[propName].ref) {
            populateList.push(propName)
        }
    });

    console.log('==== populateList', populateList);
    return populateList
}

module.exports = router;