var Mongoose = require('mongoose');

var modelo = new Mongoose.Schema({
    sequencial: { type: Number },
    processo: { type: Mongoose.Schema.Types.ObjectId, ref: 'processos' },
    ameaca: { type: Mongoose.Schema.Types.ObjectId, ref: 'ameacas' },
    procedimento: { type: String }
});

module.exports = modelo;