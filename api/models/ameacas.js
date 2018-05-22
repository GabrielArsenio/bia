var Mongoose = require('mongoose');

var modelo = new Mongoose.Schema({
    descricao: { type: String }
});

module.exports = modelo;