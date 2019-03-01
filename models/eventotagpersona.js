'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventotagpersonaSchema = new Schema({

	timestamp: { type: Date, required: false },
	direccion: { type: String, required: false},
	persona: { type: Schema.Types.ObjectId,ref:'Persona',required: false}

},{ collection: 'eventotagpersona'});

module.exports = mongoose.model('Eventotagpersona', EventotagpersonaSchema);