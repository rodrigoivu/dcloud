'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var ElementocanvasSchema = new Schema({

	name: { type: String, required: false},
	tipo: { type: String, required: false}, //barra o circulo
	unidad: { type: String, required: false},
	valor: { type: Number, required: false},
	posx: { type: Number, required: false},
	posy: { type: Number, required: false},
	min: { type: Number, required: false},
	max: { type: Number, required: false},
	limite: { type: Number, required: false},
	indicaalarma: { type: String, required: false},
	colornormal: { type: String, required: false},
	coloralarma: { type: String, required: false},
	colortitulo: { type: String, required: false},
	colorvalor: { type: String, required: false},
	colorfondo: { type: String, required: false}
	
},{ collection: 'elementocanvas'});

//EventoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Elementocanvas', ElementocanvasSchema);