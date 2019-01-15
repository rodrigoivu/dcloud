'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tag = new Schema({
  id: String,
},{ _id : false });

var di = new Schema({
  dir: String,
  valor: String,
},{ _id : false });

var ai = new Schema({
  dir: String,
  valor: String,
},{ _id : false });

var MensajeSchema = new Schema({

	tag: tag,
	di: [di],
	ai: [ai],
	
},{ _id : false });


module.exports = mongoose.model('Mensaje', MensajeSchema);