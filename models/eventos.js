var Mongoose = require('mongoose');

var modelo = new Mongoose.Schema({
    sequencial: { type: Number },
    acao: { type: Mongoose.Schema.Types.ObjectId, ref: 'acoes' },
    dataHora: { type: Date },
    descricao: { type: String }
});

module.exports = modelo;