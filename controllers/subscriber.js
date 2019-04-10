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
var Elementocanvasdi = require('../models/elementocanvasdi');
var Digitaloutput = require('../models/digitaloutput');
var Analogoutput = require('../models/analogoutput');
var Eventotagobjeto = require('../models/eventotagobjeto');
var Eventotagpersona = require('../models/eventotagpersona');
var Variableinterna = require('../models/variableinterna');
var Variableinternacanvas = require('../models/variableinternacanvas');

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
var arrayGuardaVI1=[0,0,0,0,0,0,0,0];
var arrayGuardaVI2=[0,0,0,0,0,0,0,0];
var arrayGuardaVI3=[0,0,0,0,0,0,0,0];
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
	      console.log('No hay ningún procesamiento para tópico %s', topic); 
	}
}

function manejoTopicoItem1( message, topico ){
    //var mensaje = new Mensaje();

    topicoLocal=topico;
    var mensaje;
    //console.log(message);
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
    if(mensaje.VI==1){
    	var vi1 = mensaje.p1;
	    var vi2 = mensaje.p2;
	    var vi3 = mensaje.p3;
	    var vi4 = mensaje.p4;
	    var vi5 = mensaje.p5;
	    var vi6 = mensaje.p6;
	    var vi7 = mensaje.p7;
	    var vi8 = mensaje.p8;
	    arrayGuardaVI1=[vi1,vi2,vi3,vi4,vi5,vi6,vi7,vi8];
	    guardaVI1();
    }
    if(mensaje.VI==2){
    	var vi1 = mensaje.p1;
	    var vi2 = mensaje.p2;
	    var vi3 = mensaje.p3;
	    var vi4 = mensaje.p4;
	    var vi5 = mensaje.p5;
	    var vi6 = mensaje.p6;
	    var vi7 = mensaje.p7;
	    var vi8 = mensaje.p8;
	    arrayGuardaVI2=[vi1,vi2,vi3,vi4,vi5,vi6,vi7,vi8];
	    guardaVI2();
    }
    if(mensaje.VI==3){
    	var vi1 = mensaje.p1;
	    var vi2 = mensaje.p2;
	    var vi3 = mensaje.p3;
	    var vi4 = mensaje.p4;
	    var vi5 = mensaje.p5;
	    var vi6 = mensaje.p6;
	    var vi7 = mensaje.p7;
	    var vi8 = mensaje.p8;
	    arrayGuardaVI3=[vi1,vi2,vi3,vi4,vi5,vi6,vi7,vi8];
	    guardaVI3();
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
	var date= new Date;
	// var estadoActualDI=arrayGuardaDI;
	// var i;
	var elementosCanvasdi=[];
	Elementocanvasdi.find({}) 
	   .exec((err, itemsFound) => {
	   			if (err){
	   				console.log("err: "+ err);
	   			}else{
					if(!itemsFound){
						console.log("No existen items elementocanvasdi");
					}else{
						elementosCanvasdi=itemsFound;
						detectaEventoDI(date,elementosCanvasdi);
					}
	   			}
	   		}
	   	);

	// alarma=[];
	// for (i = 0; i < estadoActualDI.length; i++) { 
	//   if(estadoActualDI[i]>estadoAnteriorDI[i]){
	//   	alarma.push(i);
	//   	var di_indice=i+1;
	//   	guardaEventoentrada('DI '+di_indice,'entrada '+di_indice,'Activado',1);
	//   }
	// }
	// estadoAnteriorDI=estadoActualDI;

	
	
}
function saveDI(date){
	var digitalinput = new Digitalinput({
			timestamp: date,
			di1: arrayGuardaDI[0],
			di2: arrayGuardaDI[1],
			di3: arrayGuardaDI[2],
			di4: arrayGuardaDI[3],
			di5: arrayGuardaDI[4],
			di6: arrayGuardaDI[5],
			di7: arrayGuardaDI[6],
			di8: arrayGuardaDI[7]
		});
	digitalinput.save((err, itemStored) => {
		if(err){
			console.log("err: "+ err);
		}else{
			if(!itemStored){
				console.log("No guardó DI");
			}else{
				mensajeDI(digitalinput);
			}
		}
	});
}
function detectaEventoDI(timestamp, elementosDI){
	var condicion;
    var ultimoDI=[];
    var datoentrada;
    var datoanterior;
    var timestampanterior;
    //Traer ultimo dato se Analoginput
 
    Digitalinput.findOne({}) 
	   //.sort([['timestamp', -1]])
	   .sort({ timestamp: -1 })
	   .exec(
	   		(err, itemsFound) => {
	   			if (err){
	   				console.log(err);
	   			}else{
	   				if(itemsFound){
		   	     		ultimoDI=[	itemsFound.di1,
									itemsFound.di2,
									itemsFound.di3,
									itemsFound.di4,
									itemsFound.di5,
									itemsFound.di6,
									itemsFound.di7,
									itemsFound.di8 ];
						timestampanterior=	itemsFound.timestamp;		
		   				//Si hay un ultimo dato comparar si es igual
						for (var i = 0; i < elementosDI.length; i++) {
							
							condicion=elementosDI[i].condicion;
							datoentrada=arrayGuardaDI[i];
							datoanterior=ultimoDI[i];
							var nombre = elementosDI[i].name;
							//Si es normal abierta y se activa o si es normal cerrada y se abre
							if((condicion=='NO' && datoentrada == 1) || (condicion=='NC' && datoentrada == 0)){
								var tpo1 = timestampanterior.getTime();
					            var tpo2 = timestamp.getTime();
					            var diff=(tpo2-tpo1)/1000;
								if(datoentrada!=datoanterior){
									var di_indice=i+1;
						            guardaEventoentrada('DI '+di_indice,nombre,'Activado',datoentrada);
								}
								if(datoentrada==datoanterior){
					        		if(diff > 3600){
					        		var di_indice=i+1;
						            guardaEventoentrada('DI '+di_indice,nombre,'Activado',datoentrada);
					        		}
					        	}		
							}
						}
					}
					saveDI(timestamp);
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
    var date = new Date;
    var elementosCanvas=[];

	Elementocanvas.find({}) 
	   .exec((err, itemsFound) => {
	   			if (err){
	   				console.log("err: "+ err);
	   			}else{
					if(!itemsFound){
						console.log("No existen items elementocanvas");
					}else{
						elementosCanvas=itemsFound;
						detectaEventoAI(date,elementosCanvas);
					}
	   			}
	   		}
	   	);
}

function saveAI(date){
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

	analoginput.save((err, itemStored) => {
		if(err){
			console.log("err: "+ err);
		}else{
			if(!itemStored){
				console.log("No guardó AI");
			}else{
				mensajeAI(analoginput);
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
    var ultimoAI=[];
    var datoanterior;
    var timestampanterior;
    //Traer ultimo dato se Analoginput
    Analoginput.findOne({}) 
	   //.sort([['timestamp', -1]])
	   .sort({ timestamp: -1 })
	   .exec(
	   		(err, itemsFound) => {
	   			if (err){
	   				console.log(err);
	   			}else{
	   				if(itemsFound){
		   	     		ultimoAI=[	itemsFound.ai1,
									itemsFound.ai2,
									itemsFound.ai3,
									itemsFound.ai4,
									itemsFound.ai5,
									itemsFound.ai6,
									itemsFound.ai7,
									itemsFound.ai8 ];
						timestampanterior=	itemsFound.timestamp;		
		   				//Si hay un ultimo dato comparar si es igual
						for (var i = 0; i < elementosAI.length; i++) {
							min=elementosAI[i].min;
							max=elementosAI[i].max;
							limite=elementosAI[i].limite;
							indicaalarma=elementosAI[i].indicaalarma;
							datoentrada=arrayGuardaAI[i];
							datoanterior=ultimoAI[i];
							//Calculo datoentradaescalado
						    if(max > min){
						       m=(max-min)/999;
						       c=max-m*999;
						       datoentradaescalado = parseFloat(Number(m*datoentrada+c).toFixed(2));
						    }
						    
						    if( (datoentradaescalado <= limite) && (indicaalarma=='sobre') || (datoentradaescalado > limite) && (indicaalarma=='bajo')){
					        	// console.log('esta normal');
						    }else{
						    	//Calcula el tiempo que paso desde la ultima entrada
						    	var tpo1 = timestampanterior.getTime();
					            var tpo2 = timestamp.getTime();
					            var diff=(tpo2-tpo1)/1000;
					            
						    	if(datoentrada!=datoanterior){ //esta fuera de limite pero es distinto que el anterior
						    		var ai_indice=i+1;
						            guardaEventoentrada('AI '+ai_indice,'entrada '+ai_indice,'Superó límite',datoentradaescalado);
						        }
						        //si son iguales y hay una diferencia de tiempo razonable guarda evento
						        if(datoentrada==datoanterior){
					        		if(diff > 3600){
					        			var ai_indice=i+1;
							            guardaEventoentrada('AI '+ai_indice,'entrada '+ai_indice,'Superó límite',datoentradaescalado);
					        		}
						        }
						    }
						}
					}
					saveAI(timestamp);
	   			}
	   			
	   		});
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
				    	//console.log(items[i]);
				    	var params={valor: arrayGuardaDO[i] }
				    	Digitaloutput.findByIdAndUpdate(items[i]._id, params, { new: true }, (err, itemUpdated) => { 
							if(err){ console.log("err: "+ err);	}
						});
				    }
				    mensajeDO(arrayGuardaDO);
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
				      mensajeAO1(arrayGuardaAO1);
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
				      mensajeAO2(arrayGuardaAO2);
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
				      mensajeAO3(arrayGuardaAO3);
				    }
	   			}
	   		}
	   	);
}

function guardaVI1(){
	var date = new Date;
    var variablesinternasCanvas=[];

	Variableinternacanvas.find({}) 
	   .exec((err, itemsFound) => {
	   			if (err){
	   				console.log("err: "+ err);
	   			}else{
					if(!itemsFound){
						console.log("No existen items elementocanvas");
					}else{
						variablesinternasCanvas=itemsFound;
						detectaEventoVI1(date,variablesinternasCanvas);
					}
	   			}
	   		}
	   	);
	
}

function saveVI1(date){
	var variableinternaSocket = new Variableinterna({
			timestamp: date,
			regleta: 1,
			vi1: arrayGuardaVI1[0],
			vi2: arrayGuardaVI1[1],
			vi3: arrayGuardaVI1[2],
			vi4: arrayGuardaVI1[3],
			vi5: arrayGuardaVI1[4],
			vi6: arrayGuardaVI1[5],
			vi7: arrayGuardaVI1[6],
			vi8: arrayGuardaVI1[7]
		});
	var variableinterna = new Variableinterna({
			timestamp: date,
			regleta: 1,
			vi1: arrayGuardaVI1[0],
			vi2: arrayGuardaVI1[1],
			vi3: arrayGuardaVI1[2],
			vi4: arrayGuardaVI1[3],
			vi5: arrayGuardaVI1[4],
			vi6: arrayGuardaVI1[5],
			vi7: arrayGuardaVI1[6],
			vi8: arrayGuardaVI1[7],
			vi9: arrayGuardaVI2[0],
			vi10: arrayGuardaVI2[1],
			vi11: arrayGuardaVI2[2],
			vi12: arrayGuardaVI2[3],
			vi13: arrayGuardaVI2[4],
			vi14: arrayGuardaVI2[5],
			vi15: arrayGuardaVI2[6],
			vi16: arrayGuardaVI2[7],
			vi17: arrayGuardaVI3[0],
			vi18: arrayGuardaVI3[1],
			vi19: arrayGuardaVI3[2],
			vi20: arrayGuardaVI3[3],
			vi21: arrayGuardaVI3[4],
			vi22: arrayGuardaVI3[5],
			vi23: arrayGuardaVI3[6],
			vi24: arrayGuardaVI3[7],
		});
	variableinterna.save((err, itemStored) => {
		if(err){
			console.log("err: "+ err);
		}else{
			if(!itemStored){
				console.log("No guardó VI");
			}else{
				mensajeVI(variableinternaSocket);
			}
		}
	});
}

function guardaVI2(){
	var date = new Date;
    var variablesinternasCanvas=[];
	
	Variableinternacanvas.find({}) 
	   .exec((err, itemsFound) => {
	   			if (err){
	   				console.log("err: "+ err);
	   			}else{
					if(!itemsFound){
						console.log("No existen items elementocanvas");
					}else{
						variablesinternasCanvas=itemsFound;
						detectaEventoVI2(date,variablesinternasCanvas);
					}
	   			}
	   		}
	   	);
	
}

function saveVI2(date){
	var variableinternaSocket = new Variableinterna({
			timestamp: date,
			regleta: 2,
			vi1: arrayGuardaVI2[0],
			vi2: arrayGuardaVI2[1],
			vi3: arrayGuardaVI2[2],
			vi4: arrayGuardaVI2[3],
			vi5: arrayGuardaVI2[4],
			vi6: arrayGuardaVI2[5],
			vi7: arrayGuardaVI2[6],
			vi8: arrayGuardaVI2[7]
		});
	var variableinterna = new Variableinterna({
			timestamp: date,
			regleta: 2,
			vi1: arrayGuardaVI1[0],
			vi2: arrayGuardaVI1[1],
			vi3: arrayGuardaVI1[2],
			vi4: arrayGuardaVI1[3],
			vi5: arrayGuardaVI1[4],
			vi6: arrayGuardaVI1[5],
			vi7: arrayGuardaVI1[6],
			vi8: arrayGuardaVI1[7],
			vi9: arrayGuardaVI2[0],
			vi10: arrayGuardaVI2[1],
			vi11: arrayGuardaVI2[2],
			vi12: arrayGuardaVI2[3],
			vi13: arrayGuardaVI2[4],
			vi14: arrayGuardaVI2[5],
			vi15: arrayGuardaVI2[6],
			vi16: arrayGuardaVI2[7],
			vi17: arrayGuardaVI3[0],
			vi18: arrayGuardaVI3[1],
			vi19: arrayGuardaVI3[2],
			vi20: arrayGuardaVI3[3],
			vi21: arrayGuardaVI3[4],
			vi22: arrayGuardaVI3[5],
			vi23: arrayGuardaVI3[6],
			vi24: arrayGuardaVI3[7],
		});
	variableinterna.save((err, itemStored) => {
		if(err){
			console.log("err: "+ err);
		}else{
			if(!itemStored){
				console.log("No guardó VI");
			}else{
				mensajeVI(variableinternaSocket);
			}
		}
	});
}

function guardaVI3(){
	var date = new Date;
    var variablesinternasCanvas=[];
	
	Variableinternacanvas.find({}) 
	   .exec((err, itemsFound) => {
	   			if (err){
	   				console.log("err: "+ err);
	   			}else{
					if(!itemsFound){
						console.log("No existen items elementocanvas");
					}else{
						variablesinternasCanvas=itemsFound;
						detectaEventoVI3(date,variablesinternasCanvas);
					}
	   			}
	   		}
	   	);
	
}
function saveVI3(date){
	var variableinternaSocket = new Variableinterna({
			timestamp: date,
			regleta: 3,
			vi1: arrayGuardaVI3[0],
			vi2: arrayGuardaVI3[1],
			vi3: arrayGuardaVI3[2],
			vi4: arrayGuardaVI3[3],
			vi5: arrayGuardaVI3[4],
			vi6: arrayGuardaVI3[5],
			vi7: arrayGuardaVI3[6],
			vi8: arrayGuardaVI3[7]
		});
	var variableinterna = new Variableinterna({
			timestamp: date,
			regleta: 3,
			vi1: arrayGuardaVI1[0],
			vi2: arrayGuardaVI1[1],
			vi3: arrayGuardaVI1[2],
			vi4: arrayGuardaVI1[3],
			vi5: arrayGuardaVI1[4],
			vi6: arrayGuardaVI1[5],
			vi7: arrayGuardaVI1[6],
			vi8: arrayGuardaVI1[7],
			vi9: arrayGuardaVI2[0],
			vi10: arrayGuardaVI2[1],
			vi11: arrayGuardaVI2[2],
			vi12: arrayGuardaVI2[3],
			vi13: arrayGuardaVI2[4],
			vi14: arrayGuardaVI2[5],
			vi15: arrayGuardaVI2[6],
			vi16: arrayGuardaVI2[7],
			vi17: arrayGuardaVI3[0],
			vi18: arrayGuardaVI3[1],
			vi19: arrayGuardaVI3[2],
			vi20: arrayGuardaVI3[3],
			vi21: arrayGuardaVI3[4],
			vi22: arrayGuardaVI3[5],
			vi23: arrayGuardaVI3[6],
			vi24: arrayGuardaVI3[7],
		});
	variableinterna.save((err, itemStored) => {
		if(err){
			console.log("err: "+ err);
		}else{
			if(!itemStored){
				console.log("No guardó VI");
			}else{
				mensajeVI(variableinternaSocket);
			}
		}
	});
}
function detectaEventoVI1(timestamp,elementosVI){
	var name;
	var min;
	var max;
	var limite;
	var indicaalarma;
	var datoentrada;
	var datoanterior;
	var datoentradaescalado;
	var m;
    var c;
    var cantItems=elementosVI.length;
	var endFor;
	var ultimoVI=[];
	var timestampanterior;
	if(cantItems < 8){
      endFor=cantItems;
    }else{
      endFor=8;
    }
    if(cantItems > 0){

    	//limite
    	//Traer ultimo dato se Analoginput
	    Variableinterna.findOne({}) 
		   //.sort([['timestamp', -1]])
		   .sort({ timestamp: -1 })
		   .exec(
		   		(err, itemsFound) => {
		   			if (err){
		   				console.log(err);
		   			}else{
		   				if(itemsFound){
			   	     		ultimoVI=[	itemsFound.vi1,
										itemsFound.vi2,
										itemsFound.vi3,
										itemsFound.vi4,
										itemsFound.vi5,
										itemsFound.vi6,
										itemsFound.vi7,
										itemsFound.vi8,

									 ];
							timestampanterior=	itemsFound.timestamp;

							for (var i = 0; i < endFor; i++) {
								name = elementosVI[i].name;
								min = elementosVI[i].min;
								max = elementosVI[i].max;
								limite = elementosVI[i].limite;
								indicaalarma = elementosVI[i].indicaalarma;
								datoentrada = arrayGuardaVI1[i];
								datoanterior=ultimoVI[i];
							    if(max > min){
							       m = (max-min)/999;
							       c = max-m*999;
							       datoentradaescalado = parseFloat(Number(m*datoentrada+c).toFixed(2));
							    }
							    if ( indicaalarma != 'no' ) {
							    	if( (datoentradaescalado <= limite) && (indicaalarma=='sobre') || (datoentradaescalado > limite) && (indicaalarma=='bajo')){
								    }else{
								    	//Calcula el tiempo que paso desde la ultima entrada
								    	var tpo1 = timestampanterior.getTime();
							            var tpo2 = timestamp.getTime();
							            var diff=(tpo2-tpo1)/1000;
								    	if(datoentrada!=datoanterior){ //esta fuera de limite pero es distinto que el anterior
								    		var vi_indice=i+1;
								        	guardaEventoentrada('VI '+vi_indice,name,'Superó límite',datoentradaescalado);
								        }
								        //si son iguales y hay una diferencia de tiempo razonable guarda evento
								        if(datoentrada==datoanterior){
							        		if(diff > 3600){
							        			var vi_indice=i+1;
								                guardaEventoentrada('VI '+vi_indice,name,'Superó límite',datoentradaescalado);
							        		}
								        }
								    	
								    }
							    }
							}
						}
						saveVI1(timestamp);
		   			}
		   		});
    }
}

function detectaEventoVI2(timestamp,elementosVI){
	var name;
	var min;
	var max;
	var limite;
	var indicaalarma;
	var datoentrada;
	var datoanterior;
	var datoentradaescalado;
	var m;
    var c;
    var cantItems=elementosVI.length;
	var endFor;
	var ultimoVI=[];
	var timestampanterior;
	if(cantItems > 8 && cantItems < 16){
      endFor=cantItems;
    }
    if(cantItems >=16 ){
      endFor=16;
    }
    if(cantItems > 8){

    	//limite
    	//Traer ultimo dato se Analoginput
	    Variableinterna.findOne({}) 
		   //.sort([['timestamp', -1]])
		   .sort({ timestamp: -1 })
		   .exec(
		   		(err, itemsFound) => {
		   			if (err){
		   				console.log(err);
		   			}else{
		   				if(itemsFound){
			   	     		ultimoVI=[	itemsFound.vi9,
										itemsFound.vi10,
										itemsFound.vi11,
										itemsFound.vi12,
										itemsFound.vi13,
										itemsFound.vi14,
										itemsFound.vi15,
										itemsFound.vi16,

									 ];
							timestampanterior=	itemsFound.timestamp;

							for (var i = 8; i < endFor; i++) {
								name = elementosVI[i].name;
								min = elementosVI[i].min;
								max = elementosVI[i].max;
								limite = elementosVI[i].limite;
								indicaalarma = elementosVI[i].indicaalarma;
								datoentrada = arrayGuardaVI2[i-8];
								datoanterior=ultimoVI[i-8];
							    if(max > min){
							       m = (max-min)/999;
							       c = max-m*999;
							       datoentradaescalado = parseFloat(Number(m*datoentrada+c).toFixed(2));
							    }
							    if ( indicaalarma != 'no' ) {
							    	if( (datoentradaescalado <= limite) && (indicaalarma=='sobre') || (datoentradaescalado > limite) && (indicaalarma=='bajo')){
								    }else{
								    	//Calcula el tiempo que paso desde la ultima entrada
								    	var tpo1 = timestampanterior.getTime();
							            var tpo2 = timestamp.getTime();
							            var diff=(tpo2-tpo1)/1000;
								    	if(datoentrada!=datoanterior){ //esta fuera de limite pero es distinto que el anterior
								    		var vi_indice=i+1;
								        	guardaEventoentrada('VI '+vi_indice,name,'Superó límite',datoentradaescalado);
								        }
								        //si son iguales y hay una diferencia de tiempo razonable guarda evento
								        if(datoentrada==datoanterior){
							        		if(diff > 3600){
							        			var vi_indice=i+1;
								                guardaEventoentrada('VI '+vi_indice,name,'Superó límite',datoentradaescalado);
							        		}
								        }
								    	
								    }
							    }
							}
						}
						saveVI2(timestamp);
		   			}
		   		});
    }
}

function detectaEventoVI3(timestamp,elementosVI){
	var name;
	var min;
	var max;
	var limite;
	var indicaalarma;
	var datoentrada;
	var datoanterior;
	var datoentradaescalado;
	var m;
    var c;
    var cantItems=elementosVI.length;
	var endFor;
	var ultimoVI=[];
	var timestampanterior;
	if(cantItems > 16 && cantItems < 24){
      endFor=cantItems;
    }
    if(cantItems >=24 ){
      endFor=24;
    }
    if(cantItems > 16){

    	//limite
    	//Traer ultimo dato se Analoginput
	    Variableinterna.findOne({}) 
		   //.sort([['timestamp', -1]])
		   .sort({ timestamp: -1 })
		   .exec(
		   		(err, itemsFound) => {
		   			if (err){
		   				console.log(err);
		   			}else{
		   				if(itemsFound){
			   	     		ultimoVI=[	itemsFound.vi17,
										itemsFound.vi18,
										itemsFound.vi19,
										itemsFound.vi20,
										itemsFound.vi21,
										itemsFound.vi22,
										itemsFound.vi23,
										itemsFound.vi24,

									 ];
							timestampanterior=	itemsFound.timestamp;

							for (var i = 16; i < endFor; i++) {
								name = elementosVI[i].name;
								min = elementosVI[i].min;
								max = elementosVI[i].max;
								limite = elementosVI[i].limite;
								indicaalarma = elementosVI[i].indicaalarma;
								datoentrada = arrayGuardaVI2[i-16];
								datoanterior=ultimoVI[i-16];
							    if(max > min){
							       m = (max-min)/999;
							       c = max-m*999;
							       datoentradaescalado = parseFloat(Number(m*datoentrada+c).toFixed(2));
							    }
							    if ( indicaalarma != 'no' ) {
							    	if( (datoentradaescalado <= limite) && (indicaalarma=='sobre') || (datoentradaescalado > limite) && (indicaalarma=='bajo')){
								    }else{
								    	//Calcula el tiempo que paso desde la ultima entrada
								    	var tpo1 = timestampanterior.getTime();
							            var tpo2 = timestamp.getTime();
							            var diff=(tpo2-tpo1)/1000;
								    	if(datoentrada!=datoanterior){ //esta fuera de limite pero es distinto que el anterior
								    		var vi_indice=i+1;
								        	guardaEventoentrada('VI '+vi_indice,name,'Superó límite',datoentradaescalado);
								        }
								        //si son iguales y hay una diferencia de tiempo razonable guarda evento
								        if(datoentrada==datoanterior){
							        		if(diff > 3600){
							        			var vi_indice=i+1;
								                guardaEventoentrada('VI '+vi_indice,name,'Superó límite',datoentradaescalado);
							        		}
								        }
								    	
								    }
							    }
							}
						}
						saveVI3(timestamp);
		   			}
		   		});
    }
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
				//console.log('idPersona');
				
			}
		}
	});
}

function buscaTagObjeto(tag,dir){
	//console.log('Buscando Tag Objeto');
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
				//console.log('idObjeto');
			}
		}
	});
}

function registraEventoTagObjeto(idObj,nserie,nparte,dir){
	var date= new Date;
	//console.log('registrando evento tag objeto:');
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
	//console.log('registrando evento tag persona:');
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
  // console.log('registrando TAG:'+tag);
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
	//console.log(topico + ": "+ message) 
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
function mensajeAI(data){
	if(socketLocal){
		ioLocal.emit('AI',{data: data});
	}
}
function mensajeDI(data){
	if(socketLocal){
		ioLocal.emit('DI',{data: data});
	}
}
function mensajeDO(data){
	if(socketLocal){
		ioLocal.emit('DO',{data: data});
	}
}
function mensajeAO1(data){
	if(socketLocal){
		ioLocal.emit('AO1',{data: data});
	}
}
function mensajeAO2(data){
	if(socketLocal){
		ioLocal.emit('AO2',{data: data});
	}
}
function mensajeAO3(data){
	if(socketLocal){
		ioLocal.emit('AO3',{data: data});
	}
}
function mensajeVI(data){
	if(socketLocal){
		//console.log(data);
		ioLocal.emit('VI',{data: data});
	}
}
module.exports = {
	filtraMensaje,
	asignarSocket,
	mensajeEvento
	
};