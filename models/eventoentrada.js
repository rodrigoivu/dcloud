'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var EventoentradaSchema = new Schema({

	timestamp: { type: Date, required: false },
	sensor: { type: String, required: false},
	descripcion: { type: String, required: false},
	evento: { type: String, required: false},
	valor: { type: Number, required: false},

});

//EventoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Eventoentrada', EventoentradaSchema);