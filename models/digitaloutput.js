'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var DigitaloutputSchema = new Schema({

	name: { type: String, required: false},
	valor: { type: Number, required: false},
	header: { type: String, required: false}, //nombre encabezado para envio por JSON

},{ collection: 'digitaloutput'});

//EventoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Digitaloutput', DigitaloutputSchema);