const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const niveisSchema = require('../models/niveis');
const niveisModel = mongoose.model('niveis', niveisSchema);

const ameacasSchema = require('../models/ameacas');
const ameacasModel = mongoose.model('ameacas', ameacasSchema);

const processosSchema = require('../models/processos');
const processosModel = mongoose.model('processos', processosSchema);

const eventosSchema = require('../models/eventos');
const eventosModel = mongoose.model('eventos', eventosSchema);

const acoesSchema = require('../models/acoes');
const acoesModel = mongoose.model('acoes', acoesSchema);

router.get('/processos-por-nivel', async (req, res, next) => {
    try {
        const result = await niveisModel.aggregate([{
            $lookup: {
                from: "processos", // collection name
                localField: "_id",
                foreignField: "nivel", // field in 'processos' collection
                as: "processos"
            }
        }]);
        res.send(result);
    } catch (err) {
        console.error("Error in GET /processos-por-nivel:", err);
        // Pass to a centralized error handler if available, otherwise send error response
        res.status(500).json({ message: err.message, error: err });
    }
});

router.get('/ameacas-aos-processos', async (req, res, next) => {
    try {
        const ameacas = await ameacasModel.aggregate([
            {
                $lookup: {
                    from: "acoes", // Ensure this is the correct collection name for 'acoes'
                    localField: "_id",
                    foreignField: "ameaca", // field in 'acoes' collection linking to 'ameacas' _id
                    as: "acoes"
                }
            }
            // Further $lookup or $unwind stages might be needed here if 'acoes.processo'
            // needs to be populated from yet another collection directly within aggregate.
        ]);

        // Fetch all processos and populate their 'nivel'
        const processos = await processosModel.find().populate('nivel');

        // Manual population logic (similar to original, but safer)
        ameacas.forEach(ameaca => {
            if (ameaca.acoes && Array.isArray(ameaca.acoes)) {
                ameaca.acoes.forEach(acao => {
                    let processoIdToFind;
                    if (acao.processo && typeof acao.processo.toJSON === 'function') { // If Mongoose objectID
                        processoIdToFind = acao.processo.toJSON().toString();
                    } else if (acao.processo) { // If plain ID string or number
                        processoIdToFind = acao.processo.toString();
                    }

                    if (processoIdToFind) {
                        const foundProcesso = processos.find(p => p._id.toString() === processoIdToFind);
                        if (foundProcesso) {
                            acao.processo = foundProcesso; // Replace ID with populated document
                        }
                    }
                });
            }
        });

        res.send(ameacas);

    } catch (err) {
        console.error("Error in GET /ameacas-aos-processos:", err);
        res.status(500).json({ message: err.message, error: err });
    }
});

router.get('/eventos-por-data', async (req, res, next) => {
    const queryParams = {};

    if (req.query.dataInicial) {
        queryParams.data = {}; // Initialize if not already
        queryParams.data['$gte'] = req.query.dataInicial;
    }

    if (req.query.dataFinal) {
        if (!queryParams.data) {
            queryParams.data = {}; // Initialize if not already
        }
        queryParams.data['$lte'] = req.query.dataFinal;
    }

    try {
        const eventos = await eventosModel.find(queryParams)
            .populate({
                path: 'acao',
                populate: [ // Ensure this is an array if multiple paths at same level
                    {
                        path: 'processo',
                        populate: { path: 'nivel' } // Deep populate
                    },
                    {
                        path: 'ameaca'
                    }
                ]
            }); // No .exec() needed with await
        res.send(eventos);
    } catch (err) {
        console.error("Error in GET /eventos-por-data:", err);
        res.status(500).json({ message: err.message, error: err });
    }
});

module.exports = router;