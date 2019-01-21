'use strict'

var Mensaje = require('../models/mensaje');
var Persona = require('../models/persona');
var Tagobjeto = require('../models/tagobjeto');
var Nuevotag = require('../models/nuevotag');
var Analoginput = require('../models/analoginput');
var Digitalinput = require('../models/digitalinput');
var Eventoentrada = require('../models/eventoentrada');
var Elementocanvas = require('../models/elementocanvas');

var socketLocal; // se rescata del index.js
var ioLocal; // se rescata del index.js
var estadoAnteriorDI=[0,0,0,0,0,0,0,0];
var alarma=[];
var msjTag='';
var msjDI='';
var arrayGuardaDI=[];
var arrayGuardaAI=[];
var topicoLocal='';


//================================================
// FILTRA DATA
//================================================
function filtraMensaje(topic, message){
	var messagestr = message.toString();
	switch (topic) {
	    case 'desimat/estado':
	      manejoTopicoItem1(messagestr, topic);
	      break;
	    case 'postplc002':
	      manejoTopicoItem2(messagestr, topic);
	      break;
	    default:
	      console.log('No hay ningún procesamiento para el tópico %s', topic); 
	}
}

function manejoTopicoItem1( message, topico ){
    //var mensaje = new Mensaje();

    topicoLocal=topico;
    var mensaje;
    console.log(message);
	mensaje = JSON.parse(message);
    if (mensaje.TAG){
    	var tag = mensaje.tag;
    	buscaTagPersona(tag);
    }
    if (mensaje.DI){
    	var di1 = mensaje.p1;
	    var di2 = mensaje.p2;
	    var di3 = mensaje.p3;
	    var di4 = mensaje.p4;
	    var di5 = mensaje.p5;
	    var di6 = mensaje.p6;
	    var di7 = mensaje.p7;
	    var di8 = mensaje.p8;
	    arrayGuardaDI=[di1,di2,di3,di4,di5,di6,di7,di8];
	    guardaDI();
    }
    if (mensaje.AI){
    	var ai1 = mensaje.p1;
	    var ai2 = mensaje.p2;
	    var ai3 = mensaje.p3;
	    var ai4 = mensaje.p4;
	    var ai5 = mensaje.p5;
	    var ai6 = mensaje.p6;
	    var ai7 = mensaje.p7;
	    var ai8 = mensaje.p8;
	    arrayGuardaAI=[ai1,ai2,ai3,ai4,ai5,ai6,ai7,ai8];
	    guardaAI();
    }

	

       
   // if(tag!='null'){
   // 	  buscaTagPersona(tag);
   // }else{
   // 	 msjTag='';
   // }
   
   // arrayGuardaDI=[di1,di2,di3,di4,di5,di6,di7,di8];
   // arrayGuardaAI=[ai1,ai2,ai3,ai4,ai5,ai6,ai7,ai8];
   
  

    
}
function guardaDI(){
	var estadoActualDI=arrayGuardaDI;
	var i;
	alarma=[];
	for (i = 0; i < estadoActualDI.length; i++) { 
	  if(estadoActualDI[i]>estadoAnteriorDI[i]){
	  	alarma.push(i);
	  	var di_indice=i+1;
	  	guardaEventoentrada('DI '+di_indice,'entrada '+di_indice,'Activado',1);
	  }
	}
	estadoAnteriorDI=estadoActualDI;

	var date= new Date;
	var digitalinput = new Digitalinput({
			timestamp: date,
			di1: estadoActualDI[0],
			di2: estadoActualDI[1],
			di3: estadoActualDI[2],
			di4: estadoActualDI[3],
			di5: estadoActualDI[4],
			di6: estadoActualDI[5],
			di7: estadoActualDI[6],
			di8: estadoActualDI[7]
		});
	digitalinput.save((err, itemStored) => {

		if(err){
			console.log("err: "+ err);
		}else{
			if(!itemStored){
				console.log("No guardó DI");
			}else{
				console.log("DI Guardado");
				msjDI=alarma;
				//avisoEntradasPLC(topicoLocal,msjTag,msjDI);
			}
		}
	});
}
function guardaEventoentrada(sensor,descripcion,evento,valor){

	var date= new Date;
	var eventoentrada = new Eventoentrada({
			timestamp: date,
			sensor:sensor,
			descripcion: descripcion,
			evento: evento,
			valor: valor
		});
	
		eventoentrada.save((err, itemStored) => {
			if(err){
				console.log("err: "+ err);
			}else{
				if(!itemStored){
					console.log("No guardó Eventoentrada");
				}else{
					//console.log("Guardó evento:"+sensor);
					mensajeEvento(sensor,evento);
				}
			}
		});
	
}

function guardaAI(){
    var date= new Date;
    var elementosCanvas=[];
	var analoginput = new Analoginput({
			timestamp: date,
			ai1: arrayGuardaAI[0],
			ai2: arrayGuardaAI[1],
			ai3: arrayGuardaAI[2],
			ai4: arrayGuardaAI[3],
			ai5: arrayGuardaAI[4],
			ai6: arrayGuardaAI[5],
			ai7: arrayGuardaAI[6],
			ai8: arrayGuardaAI[7]
		});
	
	Elementocanvas.find({}) 
	   .exec((err, itemsFound) => {
	   			if (err){
	   				console.log("err: "+ err);
	   			}else{
					if(!itemsFound){
						console.log("No existen items elementocanvas");
					}else{
						elementosCanvas=itemsFound;
						detectaEventoAI(analoginput.timestamp,elementosCanvas);
					}
	   			}
	   		}
	   	);


	analoginput.save((err, itemStored) => {

		if(err){
			console.log("err: "+ err);
		}else{
			if(!itemStored){
				console.log("No guardó AI");
			}else{

			}
		}
	});
}

function detectaEventoAI(timestamp, elementosAI){
	var min;
	var max;
	var limite;
	var indicaalarma;
	var datoentrada;
	var datoentradaescalado;
	var m;
    var c;
    
	for (var i = 0; i < elementosAI.length; i++) {
		min=elementosAI[i].min;
		max=elementosAI[i].max;
		limite=elementosAI[i].limite;
		indicaalarma=elementosAI[i].indicaalarma;
		datoentrada=arrayGuardaAI[i]
		//Calculo datoentradaescalado
	    if(max > min){
	       m=(max-min)/999;
	       c=max-m*999;
	       datoentradaescalado = parseFloat(Number(m*datoentrada+c).toFixed(2));
	    }
	    console.log('limite: '+limite);
	    console.log('dato: '+ datoentradaescalado);
	    if( (datoentradaescalado <= limite) && (indicaalarma=='sobre') || (datoentradaescalado > limite) && (indicaalarma=='bajo')){
        	// console.log('esta normal');
	    }else{
	    	var ai_indice=i+1;
	        guardaEventoentrada('AI '+ai_indice,'entrada '+ai_indice,'Superó límite',datoentradaescalado);
	    }
	}
	
}

function buscaTagPersona(tag){
	var idPersona=null;
	//BUSCAR EN PERSONAS
    Persona.findOne({'tag': tag}, (err,itemFound) => { 
		if(err){
			console.log("err: "+ err);
			msjTag='';
			buscaTagObjeto(tag);
		}else{
			if(!itemFound){
				console.log("no existe persona: " + itemFound);
				msjTag='';
				buscaTagObjeto(tag);
			}else{
				msjTag='';
				idPersona=itemFound._id;
			}
		}
	});
}

function buscaTagObjeto(tag){
	console.log('Buscando Tag Objeto');
	var idObjeto = null;
	var idTagObjeto = null;
	//BUSCAR EN OBJETOS
    Tagobjeto.findOne({'tag': tag}, (err,itemFound) => { 
		if(err){
			console.log("err: "+ err);
			msjTag='';
		}else{
			if(!itemFound){
				console.log("no existe tagobjeto: " + itemFound);
				msjTag='';
				registraNuevoTag(tag);
			}else{
				idTagObjeto = itemFound._id;
				idObjeto = itemFound.objeto;
				msjTag='';
			}
		}
	});
}

function registraNuevoTag(tag){
   console.log('registrando TAG');
	var nuevotag = new Nuevotag({
		tag: tag,
		destino: 'Inicial'
	});
	nuevotag.save((err, itemStored) => {

		if(err){
			console.log("err: "+ err);
			msjTag='';
		}else{
			if(!itemStored){
				console.log("No guardó tag");
				msjTag='';
			}else{
				//msjTag= "nuevo tag"
				//console.log(msjTag);
				//avisoEntradasPLC(topicoLocal,msjTag,msjDI);
			}
		}
	});
}

function manejoTopicoItem2( message, topico ){
	console.log(topico + ": "+ message) 
}

function asignarSocket(socket){
    socketLocal=socket;
}

function mensajeEvento(sensor,evento){
	if(socketLocal){
		socketLocal.emit('evento', {sensor: sensor, evento: evento});
	}
}
module.exports = {
	filtraMensaje,
	asignarSocket,
	mensajeEvento
	
};
