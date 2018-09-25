var Mongoose = require('mongoose');

var modelo = new Mongoose.Schema({
    sequencial: { type: Number },
    acao: { type: Mongoose.Schema.Types.ObjectId, ref: 'acoes' },
    data: { type: Date },
    hora: { type: String },
    descricao: { type: String }
});

module.exports = modelo;