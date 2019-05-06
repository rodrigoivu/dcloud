'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var objetosValidos = {
	values: ['Herramienta', 'Repuesto', 'Indefinido'],
	message: '{VALUE} no es un objeto permitido'
};
//OJO CAMBIAR NOMBRE DE SCHEMA SEGUN ARCHIVO
var ObjetoSchema = new Schema({

	tipo: { type: String, required: [true,'El tipo de objeto es requerido'], default: 'Indefinido', enum: objetosValidos },
	descripcion: { type: String, unique: true, required: [true,'La descripción es requerida'] },
	info: { type: String, required: false },
	disciplina: { type: String, required: false },
	categoria: { type: String, required: false },
	grupo: { type: String, required: false },
	stockmin: { type: String, required: false, default: '0' },
	stock: { type: String, required: false, default: '0'},
	imagen: { type: String, required: false }
	
});
//OJO CAMBIAR NOMBRE DE SCHEMA SEGUN ARCHIVO
ObjetoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente
//OJO CAMBIAR NOMBRE DEL ERGUMENTO Y DEL SCHEMA SEGUN ARCHIVO
module.exports = mongoose.model('Objeto', ObjetoSchema);