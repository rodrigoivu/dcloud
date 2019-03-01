'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventotagobjetoSchema = new Schema({

	timestamp: { type: Date, required: false },
	direccion: { type: String, required: false},
	objeto:{ type: Schema.Types.ObjectId,ref:'Objeto',required: false},
	nserie: { type: String, required: false },
 	nparte: { type: String, required: false }

},{ collection: 'eventotagobjeto'});

module.exports = mongoose.model('Eventotagobjeto', EventotagobjetoSchema);