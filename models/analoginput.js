'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var AnaloginputSchema = new Schema({

	timestamp: { type: Date, required: false },
	ai1: { type: Number, required: false},
	ai2: { type: Number, required: false},
	ai3: { type: Number, required: false},
	ai4: { type: Number, required: false},
	ai5: { type: Number, required: false},
	ai6: { type: Number, required: false},
	ai7: { type: Number, required: false},
	ai8: { type: Number, required: false}

},{ collection: 'analoginput'});

//EventoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Analoginput', AnaloginputSchema);