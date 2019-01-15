'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

//OJO CAMBIAR NOMBRE DE SCHEMA SEGUN ARCHIVO
var PersonaSchema = new Schema({

	rut: { type: String, unique: true,required: [true,'El rut es necesario'] },
	nombre: { type: String, required: [true,'El nombre es necesario']},
	tag:{ type: String,unique: true, required: [true,'El tag es necesario'] },
	empresa: { type: String, required: false },
	cargo: { type: String, required: false },
	area:{ type: String, required: false }, 
	imagen:{ type: String, required: false },
	autorizado:{ type: String, required: false },
	fechaincorporacion:{ type: String, required: false },
	tipolicenciaconducir:{ type: String, required: false },
	mutualidad:{ type: String, required: false },
	fechaexamenocupacional:{ type: String, required: false },
	fechaexamenalturafisica:{ type: String, required: false },
	fechaexamenalturageo:{ type: String, required: false },
	fechafincontrato:{ type: String, required: false },
	archivoexamen1:{ type: String, required: false },
	archivoexamen2:{ type: String, required: false },
	archivoexamen3:{ type: String, required: false },
	archivocontrato:{ type: String, required: false },
	responsablearchivoexamen1:{ type: String, required: false },
	responsablearchivoexamen2:{ type: String, required: false },
	responsablearchivoexamen3:{ type: String, required: false },
	responsablearchivocontrato:{ type: String, required: false },

});
//OJO CAMBIAR NOMBRE DE SCHEMA SEGUN ARCHIVO
PersonaSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente
//OJO CAMBIAR NOMBRE DEL ERGUMENTO Y DEL SCHEMA SEGUN ARCHIVO
module.exports = mongoose.model('Persona', PersonaSchema);