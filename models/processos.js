var Mongoose = require('mongoose');

var modelo = new Mongoose.Schema({
    descricao: { type: String, required: true },
    nivel: { type: Mongoose.Schema.Types.ObjectId, ref: 'niveis' },
    tolerancia: { type: String }
});

module.exports = modelo;