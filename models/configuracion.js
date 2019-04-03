'use strict'
var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

//OJO CAMBIAR NOMBRE DE SCHEMA SEGUN ARCHIVO
var ConfiguracionSchema = new Schema({
	image: { type: String, required: false },
	imagelogo: { type: String, required: false },
	imagecorporativa: { type: String, required: false },
	titulodash1:{ type: String, required: false },
	titulodash2:{ type: String, required: false },
	titulocontrol:{ type: String, required: false },
	tituloplanta:{ type: String, required: false },
	titulosalidas:{ type: String, required: false },
	tituloDO1:{ type: String, required: false },
	tituloAO1:{ type: String, required: false },
	tituloAO2:{ type: String, required: false },
	tituloAO3:{ type: String, required: false },
	tituloVI1:{ type: String, required: false },
	tituloVI2:{ type: String, required: false },
	tituloVI3:{ type: String, required: false },
	subtitulosalidas:{ type: String, required: false },
	subtituloDO1:{ type: String, required: false },
	subtituloAO1:{ type: String, required: false },
	subtituloAO2:{ type: String, required: false },
	subtituloAO3:{ type: String, required: false },
	subtituloVI1:{ type: String, required: false },
	subtituloVI2:{ type: String, required: false },
	subtituloVI3:{ type: String, required: false },
},{ collection: 'configuracion'});

//OJO CAMBIAR NOMBRE DE SCHEMA SEGUN ARCHIVO
//ConfiguracionSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

//OJO CAMBIAR NOMBRE DEL ERGUMENTO Y DEL SCHEMA SEGUN ARCHIVO
module.exports = mongoose.model('Configuracion', ConfiguracionSchema);