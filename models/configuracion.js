'use strict'
var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

//OJO CAMBIAR NOMBRE DE SCHEMA SEGUN ARCHIVO
var ConfiguracionSchema = new Schema({
	image: { type: String, required: false }
},{ collection: 'configuracion'});

//OJO CAMBIAR NOMBRE DE SCHEMA SEGUN ARCHIVO
//ConfiguracionSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

//OJO CAMBIAR NOMBRE DEL ERGUMENTO Y DEL SCHEMA SEGUN ARCHIVO
module.exports = mongoose.model('Configuracion', ConfiguracionSchema);