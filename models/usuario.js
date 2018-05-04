var Mongoose = require('mongoose');

var modelo = new Mongoose.Schema({
    nome: { type: String },
    cpf: { type: String },
    telefone: { type: String },
    email: { type: String },
    login: { type: String },
    senha: { type: String },
    cargo: { type: String }
});

module.exports = modelo;