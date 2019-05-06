'use strict'
//OJO CAMBIAR NOMBRE DE COLLECCION Y MODEL SEGÚN LA CONSULTA
var Eventotagobjeto = require('../models/eventotagobjeto');


//================================================
// MOSTRAR TODOS LOS ITEMS 
//================================================
function itemsTodos(req,res){

	//OJO CAMBIAR NOMBRE DE COLLECCION Y CAMPOS SEGÚN LA CONSULTA
	Eventotagobjeto.find({})
	   //.sort([['timestamp', 1]])
	   .populate('objeto', 'tipo descripcion imagen')
	   .sort({ _id: 'asc' })
	   .exec(
	   		(err, itemsFound) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando items'});
	   			}else{
	   				//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	   				Eventotagobjeto.countDocuments({}, (err,conteo) =>{
	   					res.status(200).send({
								items: itemsFound,
								total: conteo
						});
	   				});
	   				
	   			}
	   		}
	   	);
}

//================================================
// MOSTRAR RANGO LOS ITEMS 
//================================================
function itemsRangoUltimos(req,res){
	var items = req.query.items || 1000;
	items = Number(items);
	//OJO CAMBIAR NOMBRE DE COLLECCION Y CAMPOS SEGÚN LA CONSULTA
	Eventotagobjeto.find({})
	   .skip(0)
	   .limit(items)
	   //.sort([['timestamp', -1]])
	   .populate('objeto', 'tipo descripcion imagen')
	   .sort({ _id: 'desc' })
	   .exec(
	   		(err, itemsFound) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando items'});
	   			}else{
	   				if(!itemsFound){
						res.status(404).send({message: 'Imposible mostrar información'});
					}else{	
		   				Eventotagobjeto.countDocuments({}, (err,conteo) =>{
		   					res.status(200).send({
								items: itemsFound,
								total: conteo
							});
		   				});
		   			}
	   				
	   			}
	   		}
	   	);
}
//================================================
// MOSTRAR RANGO DE FECHAS
//================================================
function itemsRangoFechas(req,res){
	var desde = req.query.desde;
	var hasta = req.query.hasta;
	// console.log(new Date(desde));
	// console.log(new Date(hasta));
	//OJO CAMBIAR NOMBRE DE COLLECCION Y CAMPOS SEGÚN LA CONSULTA

	Eventotagobjeto.find({timestamp : {
					    '$gte': (new Date(desde)).getTime(),
					    '$lte': (new Date(hasta)).getTime()
						}
					})
	   //.sort([['timestamp', 1]])
	   .populate('objeto', 'tipo descripcion imagen')
	   .sort({ _id: 'asc' })
	   .exec(
	   		(err, itemsFound) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando items'});
	   			}else{
	   				if(!itemsFound){
						res.status(404).send({message: 'Imposible mostrar información'});
					}else{
                        res.status(200).send({
							items: itemsFound
						});
		   			}
	   				
	   			}
	   		}
	   	);
}

module.exports = {
	itemsTodos,
	itemsRangoUltimos,
	itemsRangoFechas
};
