var Mongoose = require('mongoose');

var modelo = new Mongoose.Schema({
    descricao: { type: String, required: true }
});

module.exports = modelo;