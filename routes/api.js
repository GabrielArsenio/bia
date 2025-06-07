const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const fs = require('fs');

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

router.get('/:resource', async (req, res, next) => {
    try {
        const model = createModel(req.params.resource);
        const populateList = getPopulateList(req.params.resource);
        // Using model.find() with no arguments to fetch all documents, then populate
        const docs = await model.find().populate(populateList);
        res.send(docs);
    } catch (err) {
        console.error("Error in GET /:resource :", err);
        // Consider using next(err) for a centralized error handler
        res.status(500).json({ message: err.message, error: err });
    }
});

router.get('/:resource/:id', async (req, res, next) => {
    try {
        const model = createModel(req.params.resource);
        const populateList = getPopulateList(req.params.resource);
        const doc = await model.findById(req.params.id).populate(populateList);

        if (doc) {
            res.send(doc.toJSON()); // .toJSON() is fine
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(`Error in GET /:resource/${req.params.id} :`, err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ID format', error: err });
        }
        // Consider using next(err) for a centralized error handler
        res.status(500).json({ message: err.message, error: err });
    }
});

router.post('/:resource', async (req, res, next) => {
    const model = createModel(req.params.resource);
    const requestBody = req.body; // Can be single object or array

    try {
        // Optional: Synchronous pre-validation (Mongoose's create will also validate)
        const docsToValidate = Array.isArray(requestBody) ? requestBody : [requestBody];
        for (const doc of docsToValidate) {
            const validationError = new model(doc).validateSync();
            if (validationError) {
                // Send 400 with validation error details
                return res.status(400).json(validationError);
            }
        }

        // Mongoose create can handle single object or array of objects
        let createdDocs = await model.create(requestBody);

        // Populate the created document(s)
        const populateList = getPopulateList(req.params.resource);
        // model.populate can take a single doc or an array.
        // If populateList is an array of strings (paths), Mongoose should handle it.
        createdDocs = await model.populate(createdDocs, populateList);

        res.status(201).send(createdDocs);

    } catch (err) {
        console.error(`Error in POST /:resource :`, err);
        // Mongoose validation errors (from create) have name: 'ValidationError'
        if (err.name === 'ValidationError') {
            return res.status(400).json(err);
        }
        // Other errors (e.g., database connection, unexpected issues)
        res.status(500).json({ message: err.message, error: err });
    }
});

router.put('/:resource/:id', async (req, res, next) => {
    try {
        const model = createModel(req.params.resource);
        const updatedDoc = await model.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Returns the modified document
            runValidators: true // Ensures schema validation is run on update
        });

        if (updatedDoc) {
            res.sendStatus(204); // Successful update, no content
        } else {
            res.sendStatus(404); // Document not found
        }
    } catch (err) {
        console.error(`Error in PUT /:resource/${req.params.id} :`, err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ID format', error: err });
        }
        if (err.name === 'ValidationError') {
            return res.status(400).json(err);
        }
        res.status(500).json({ message: err.message, error: err });
    }
});

router.delete('/:resource/:id', async (req, res, next) => {
    try {
        const model = createModel(req.params.resource);
        const deletedDoc = await model.findByIdAndDelete(req.params.id);

        if (deletedDoc) {
            res.sendStatus(204); // Successful deletion, no content
        } else {
            res.sendStatus(404); // Document not found
        }
    } catch (err) {
        console.error(`Error in DELETE /:resource/${req.params.id} :`, err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ID format', error: err });
        }
        res.status(500).json({ message: err.message, error: err });
    }
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