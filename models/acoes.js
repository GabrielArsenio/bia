var Mongoose = require('mongoose');

var modelo = new Mongoose.Schema({
    sequencial: { type: Number },
    _processosId: { type: Mongoose.Schema.Types.ObjectId, ref: 'processos' },
    _ameacasId: { type: Mongoose.Schema.Types.ObjectId, ref: 'ameacas' },
    procedimento: { type: String }
});

module.exports = modelo;