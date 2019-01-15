'use strict'
var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var SubsignalSchema = new Schema({

	nombre: { type: String, required: false},
	valor: { type: String, required: false},
	fecha: { type: String, required: false},
	hora: { type: String, required: false},
	
},{ collection: 'subsignal'}); // esto es para evitar que se grave como subsignals

module.exports = mongoose.model('Subsignal', SubsignalSchema);