var Mongoose = require('mongoose');

var modelo = new Mongoose.Schema({
    nome: { type: String, required: true },
    login: { type: String, required: true, index: true, unique: true },
    senha: { type: String, required: true }
});

module.exports = modelo;