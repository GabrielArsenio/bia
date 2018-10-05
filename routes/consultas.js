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

router.get('/ameacas-aos-processos', (req, res, next) => {
    ameacasModel.aggregate([{
        $lookup: {
            from: "acoes",
            localField: "_id",
            foreignField: "ameaca",
            as: "acoes"
        }
    }], (err, ameacas) => {
        processosModel
            .find(null, (err, processos) => {
                ameacas.forEach(ameaca => {
                    ameaca.acoes.forEach(acao => {
                        const processoId = acao.processo.toJSON()
                        acao.processo = processos.find(x => x.id === processoId)
                    })
                });
                res.send(ameacas);
            })
            .populate('nivel')
            .exec();
    });
});

router.get('/eventos-por-data', (req, res, next) => {
    const queryParams = {};

    if (req.query.dataInicial) {
        queryParams.data = {}
        queryParams.data['$gte'] = req.query.dataInicial
    }

    if (req.query.dataFinal) {
        if (!queryParams.data) {
            queryParams.data = {}
        }
        queryParams.data['$lte'] = req.query.dataFinal
    }

    eventosModel.find(queryParams, (err, eventos) => {
        res.send(eventos);
    })
    .populate({
        path: 'acao',
        populate: [{ 
            path: 'processo',
            populate: { path: 'nivel' }
        }, {
            path: 'ameaca'
        }]
    })
    .exec();
});

module.exports = router;