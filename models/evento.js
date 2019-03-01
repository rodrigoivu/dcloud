'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var EventoSchema = new Schema({

	timestamp: { type: Date, required: false },
	evento: { type: String, required: false},
	persona: { type: Schema.Types.ObjectId,ref:'Persona',required: false}, 
	objeto:{ type: Schema.Types.ObjectId,ref:'Objeto',required: false}

});

//EventoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Evento', EventoSchema);