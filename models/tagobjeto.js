'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

//OJO CAMBIAR NOMBRE DE SCHEMA SEGUN ARCHIVO
var TagobjetoSchema = new Schema({

  tag: { type: String, unique: true, required: [true,'El tag es requerido'] },
  objeto: { type: Schema.Types.ObjectId,ref:'Objeto',required: [true,'El tipo de objeto es requerido']},
  nserie: { type: String, unique: true, required: [true,'El número de serie es requerido'] },
  nparte: { type: String, required: [true,'El número de parte es requerido'] },

});

//OJO CAMBIAR NOMBRE DE SCHEMA SEGUN ARCHIVO
TagobjetoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

//OJO CAMBIAR NOMBRE DEL ERGUMENTO Y DEL SCHEMA SEGUN ARCHIVO
module.exports = mongoose.model('Tagobjeto', TagobjetoSchema);