'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var ElementocanvasdiSchema = new Schema({

	name: { type: String, required: false},
	tipo: { type: String, required: false}, //barra o circulo
	unidad: { type: String, required: false},
	valor: { type: Number, required: false},
	posx: { type: Number, required: false},
	posy: { type: Number, required: false},
	condicion: { type: String, required: false}, // normal abierto normal cerrado  NO NC
	colornormal: { type: String, required: false},
	coloralarma: { type: String, required: false},
	colortitulo: { type: String, required: false}
},{ collection: 'elementocanvasdi'});

//EventoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Elementocanvasdi', ElementocanvasdiSchema);