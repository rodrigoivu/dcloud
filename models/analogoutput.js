'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var AnalogoutputSchema = new Schema({

	name: { type: String, required: false},
	unidad: { type: String, required: false},
	valor: { type: Number, required: false},
	min: { type: Number, required: false},
	max: { type: Number, required: false},
	header: { type: String, required: false}, //nombre encabezado para envio por JSON
},{ collection: 'analogoutput'});

//EventoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Analogoutput', AnalogoutputSchema);