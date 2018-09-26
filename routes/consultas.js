const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const niveisSchema = require('../models/niveis');
const niveisModel = mongoose.model('niveis', niveisSchema);

router.get('/processos-por-nivel', (req, res, next) => {
    niveisModel.aggregate([{
        $lookup: {
            from: "processos",
            localField: "_id",
            foreignField: "nivel",
            as: "processos"
        }
    }], (err, result) => {
        res.send(result);
    });
});

module.exports = router;