'use strict'

var Mensaje = require('../models/mensaje');
var Persona = require('../models/persona');
var Objeto = require('../models/objeto');
var Tagobjeto = require('../models/tagobjeto');
var Nuevotag = require('../models/nuevotag');
var Analoginput = require('../models/analoginput');
var Digitalinput = require('../models/digitalinput');
var Eventoentrada = require('../models/eventoentrada');
var Elementocanvas = require('../models/elementocanvas');
var Digitaloutput = require('../models/digitaloutput');
var Analogoutput = require('../models/analogoutput');
var Eventotagobjeto = require('../models/eventotagobjeto');
var Eventotagpersona = require('../models/eventotagpersona');

var PushnotificationsController = require ('../controllers/pushnotifications');

var socketLocal; // se rescata del index.js
var ioLocal; // se rescata del index.js
var estadoAnteriorDI=[0,0,0,0,0,0,0,0];
var alarma=[];
var msjTag='';
var msjDI='';
var arrayGuardaDI=[];
var arrayGuardaAI=[];
var arrayGuardaDO=[];
var arrayGuardaAO1=[];
var arrayGuardaAO2=[];
var arrayGuardaAO3=[];
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
    	var dir =mensaje.d; //d de direccion
    	buscaTagPersona(tag,dir);
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
    if(mensaje.DO==1){
    	var do1 = mensaje.p1;
	    var do2 = mensaje.p2;
	    var do3 = mensaje.p3;
	    var do4 = mensaje.p4;
	    var do5 = mensaje.p5;
	    var do6 = mensaje.p6;
	    var do7 = mensaje.p7;
	    var do8 = mensaje.p8;
	    arrayGuardaDO=[do1,do2,do3,do4,do5,do6,do7,do8];
	    guardaDO();
    }
    if(mensaje.AO==1){
    	var ao1 = mensaje.p1;
	    var ao2 = mensaje.p2;
	    var ao3 = mensaje.p3;
	    var ao4 = mensaje.p4;
	    var ao5 = mensaje.p5;
	    var ao6 = mensaje.p6;
	    var ao7 = mensaje.p7;
	    var ao8 = mensaje.p8;
	    arrayGuardaAO1=[ao1,ao2,ao3,ao4,ao5,ao6,ao7,ao8];
	    guardaAO1();
    }
    if(mensaje.AO==2){
    	var ao1 = mensaje.p1;
	    var ao2 = mensaje.p2;
	    var ao3 = mensaje.p3;
	    var ao4 = mensaje.p4;
	    var ao5 = mensaje.p5;
	    var ao6 = mensaje.p6;
	    var ao7 = mensaje.p7;
	    var ao8 = mensaje.p8;
	    arrayGuardaAO2=[ao1,ao2,ao3,ao4,ao5,ao6,ao7,ao8];
	    guardaAO2();
    }
    if(mensaje.AO==3){
    	var ao1 = mensaje.p1;
	    var ao2 = mensaje.p2;
	    var ao3 = mensaje.p3;
	    var ao4 = mensaje.p4;
	    var ao5 = mensaje.p5;
	    var ao6 = mensaje.p6;
	    var ao7 = mensaje.p7;
	    var ao8 = mensaje.p8;
	    arrayGuardaAO3=[ao1,ao2,ao3,ao4,ao5,ao6,ao7,ao8];
	    guardaAO3();
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
					notificar(date,sensor,evento,valor);
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
//RESPUESTA DE SALIDAS ANALOGAS y digitales
function guardaDO(){
	var items=[];
	//traer todos los item
	Digitaloutput.find({}) 
	   .exec(
	   		(err, itemsFound) => {
	   			if (err){
	   				console.log("err: "+ err);
	   			}else{
	   				items=itemsFound;
	   				for (var i = 0; i < items.length; i++) {
				    	console.log(items[i]);
				    	var params={valor: arrayGuardaDO[i] }
				    	Digitaloutput.findByIdAndUpdate(items[i]._id, params, { new: true }, (err, itemUpdated) => { 
							if(err){ console.log("err: "+ err);	}
						});
				    }
	   			}
	   		}
	   	);
}
function guardaAO1(){
	var items=[];
	//traer todos los item
	Analogoutput.find({}) 
	   .exec(
	   		(err, itemsFound) => {
	   			if (err){
	   				console.log("err: "+ err);
	   			}else{
	   				items=itemsFound;
	   				var cantAO=items.length;
				    var endFor;
				    if(cantAO < 8){
				      endFor=cantAO;
				    }else{
				      endFor=8;
				    }
				    if(cantAO > 0){
				      for (var i = 0; i < endFor; ++i) {
				      	var params={valor: arrayGuardaAO1[i] }
				    	Analogoutput.findByIdAndUpdate(items[i]._id, params, { new: true }, (err, itemUpdated) => { 
							if(err){ console.log("err: "+ err);	}
						});
				      }
				    }
	   				
	   			}
	   		}
	   	);
}
function guardaAO2(){
	var items=[];
	//traer todos los item
	Analogoutput.find({}) 
	   .exec(
	   		(err, itemsFound) => {
	   			if (err){
	   				console.log("err: "+ err);
	   			}else{
	   				items=itemsFound;
	   				var cantAO=items.length;
				    var endFor;
				    if(cantAO > 8 && cantAO < 16){
				      endFor=cantAO;
				    }
				    if(cantAO >=16 ){
				      endFor=16;
				    }
				    if(cantAO > 8){
				      for (var i = 8; i < endFor; ++i) {
				      	var params={valor: arrayGuardaAO2[i-8] }
				    	Analogoutput.findByIdAndUpdate(items[i]._id, params, { new: true }, (err, itemUpdated) => { 
							if(err){ console.log("err: "+ err);	}
						});
				      }
				    }
	   			}
	   		}
	   	);
}
function guardaAO3(){
	var items=[];
	//traer todos los item
	Analogoutput.find({}) 
	   .exec(
	   		(err, itemsFound) => {
	   			if (err){
	   				console.log("err: "+ err);
	   			}else{
	   				items=itemsFound;
	   				var cantAO=items.length;
				    var endFor;
				    if(cantAO > 16 && cantAO < 24){
				      endFor=cantAO;
				    }
				    if(cantAO >=24 ){
				      endFor=24;
				    }
				    if(cantAO > 16){
				      for (var i = 16; i < endFor; ++i) {
				      	var params={valor: arrayGuardaAO3[i-16] }
				    	Analogoutput.findByIdAndUpdate(items[i]._id, params, { new: true }, (err, itemUpdated) => { 
							if(err){ console.log("err: "+ err);	}
						});
				      }
				    }
	   			}
	   		}
	   	);
}

function buscaTagPersona(tag,dir){
	var idPersona=null;
	//BUSCAR EN PERSONAS
    Persona.findOne({'tag': tag}, (err,itemFound) => { 
		if(err){
			console.log("err: "+ err);
			msjTag='';
			buscaTagObjeto(tag,dir);
		}else{
			if(!itemFound){
				console.log("no existe persona: " + itemFound);
				msjTag='';
				buscaTagObjeto(tag,dir);
			}else{
				msjTag='';
				idPersona=itemFound._id;
				registraEventoTagPersona(idPersona,dir);
				console.log('idPersona');
				
			}
		}
	});
}

function buscaTagObjeto(tag,dir){
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
				registraNuevoTag(tag);
			}else{
				idTagObjeto = itemFound._id;
				idObjeto = itemFound.objeto;
				registraEventoTagObjeto(idObjeto,itemFound.nserie,itemFound.nparte,dir);
				console.log('idObjeto');
			}
		}
	});
}

function registraEventoTagObjeto(idObj,nserie,nparte,dir){
	var date= new Date;
	console.log('registrando evento tag objeto:');
	var nuevoeventotagobjeto = new Eventotagobjeto({
		timestamp: date,
		direccion: dir,
		objeto:idObj,
		nserie: nserie,
	 	nparte: nparte
	});
	nuevoeventotagobjeto.save((err, itemStored) => {

		if(err){
			console.log("err: "+ err);
		}else{
			if(!itemStored){
				console.log("No guardó tag");
			}else{
				buscarStockActual(idObj,dir);
			}
		}
	});
}
function buscarStockActual(idObj,dir){
	var stockactual;
	//Buscar stock actual
	Objeto.findById(idObj, (err,itemFound) => { 
		if(err){
			console.log("err: "+ err);
		}else{
			if(!itemFound){
				console.log('Imposible rescatar el item');
			}else{
				
				if(itemFound.stock == null){
					stockactual= '0';
				}else{
					stockactual= itemFound.stock;
				}
				actualizaStockObjeto(idObj,dir,stockactual);
			}
		}
	});
}
function actualizaStockObjeto(idObj,dir,stockactual){
	var stockNumber;
	var stockString;
	var stockInicial=parseInt(stockactual);
	if(dir == '1'){
		stockNumber=stockInicial+1
	}
	if(dir == '0'){
		stockNumber=stockInicial-1
	}
	stockString=stockNumber;
	var params = {
		stock:stockString
	};
	Objeto.findByIdAndUpdate(idObj, params, { new: true }, (err, itemUpdated) => { 
		if(err){
			console.log("err: "+ err);
		}else{
			if(!itemUpdated){
				console.log('Imposible actualizar item');
			}else{
				mensajeTag();
			}
		}
	});
	
}

function registraEventoTagPersona(idPer,dir){
	var date= new Date;
	console.log('registrando evento tag persona:');
	var nuevoeventotagpersona = new Eventotagpersona({
		timestamp: date,
		direccion: dir,
		persona:idPer,
	});
	nuevoeventotagpersona.save((err, itemStored) => {

		if(err){
			console.log("err: "+ err);
		}else{
			if(!itemStored){
				console.log("No guardó tag");
			}else{
				mensajeTag();
			}
		}
	});
}

function registraNuevoTag(tag){
   console.log('registrando TAG:'+tag);
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

function asignarSocket(socket,io){
    socketLocal=socket;
    ioLocal=io;
}
function notificar(date,sensor,evento,valor){
	var title = sensor+' '+evento;
	var body = 'Valor: '+valor+', '+date
	PushnotificationsController.pushNotificarEvento(title,body);
}

function mensajeEvento(sensor,evento){
	if(socketLocal){
		//socketLocal.join('evento');
		//socketLocal.broadcast.emit('evento', {sensor: sensor, evento: evento});
		//socketLocal.join('evento');
		//socketLocal.to('evento').emit({sensor: sensor, evento: evento});
		ioLocal.emit('evento',{sensor: sensor, evento: evento});
	}
}
function mensajeTag(){
	if(socketLocal){
		//socketLocal.join('evento');
		//socketLocal.broadcast.emit('evento', {sensor: sensor, evento: evento});
		//socketLocal.join('evento');
		//socketLocal.to('evento').emit({sensor: sensor, evento: evento});
		ioLocal.emit('Tag',{mensaje: 'tag'});
	}
}
module.exports = {
	filtraMensaje,
	asignarSocket,
	mensajeEvento
	
};