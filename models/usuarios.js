const Mongoose = require('mongoose');

const modelo = new Mongoose.Schema({
    nome: { type: String, required: true },
    foto: { type: String },
    login: { type: String, required: true, index: true, unique: true },
    senha: { type: String, required: true }
});

module.exports = modelo;