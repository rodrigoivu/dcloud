'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var DigitalinputSchema = new Schema({

	timestamp: { type: Date, required: false },
	di1: { type: Number, required: false},
	di2: { type: Number, required: false},
	di3: { type: Number, required: false},
	di4: { type: Number, required: false},
	di5: { type: Number, required: false},
	di6: { type: Number, required: false},
	di7: { type: Number, required: false},
	di8: { type: Number, required: false}

},{ collection: 'digitalinput'});

//EventoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Digitalinput', DigitalinputSchema);