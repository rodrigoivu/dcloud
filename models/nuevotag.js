'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var destinoValido = {
	values: ['Objeto','Persona', 'Inicial'],
	message: '{VALUE} no es un destino permitido'
};

//OJO CAMBIAR NOMBRE DE SCHEMA SEGUN ARCHIVO
var NuevotagSchema = new Schema({

  tag: { type: String, unique: true, required: [true,'El tag es requerido'] },
  destino: { type: String, required: false, default: 'Inicial', enum: destinoValido},

});

//OJO CAMBIAR NOMBRE DE SCHEMA SEGUN ARCHIVO
NuevotagSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente
//OJO CAMBIAR NOMBRE DEL ERGUMENTO Y DEL SCHEMA SEGUN ARCHIVO
module.exports = mongoose.model('Nuevotag', NuevotagSchema);