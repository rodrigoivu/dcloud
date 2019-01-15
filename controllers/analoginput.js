'use strict'
//OJO CAMBIAR NOMBRE DE COLLECCION Y MODEL SEGÚN LA CONSULTA
var Analoginput = require('../models/analoginput');

//================================================
// CREAR UN ITEM
//================================================

function registraItem(req,res){
	//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	var item = new Analoginput(req.body);
	//OJO CAMBIAR CONDICIONES SEGÚN MODELO

	item.save((err, itemStored) => {
		if(err){
			res.status(500).send({
				error: err,
				message: 'Puede que el Item ya exista'
			});
		}else{
			if(!itemStored){
				res.status(404).send({
					message: 'Imposible registrar item'
				});
			}else{
				res.status(200).send({
					item: itemStored,
				});
			}
		}
	});

}

//================================================
// MOSTRAR TODOS LOS ITEMS 
//================================================
function itemsTodos(req,res){

	//OJO CAMBIAR NOMBRE DE COLLECCION Y CAMPOS SEGÚN LA CONSULTA
	Analoginput.find({}) 
	   .sort([['timestamp', 1]])	
	   .exec(
	   		(err, itemsFound) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando items'});
	   			}else{
	   				//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	   				Analoginput.countDocuments({}, (err,conteo) =>{
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
function itemsRangoTiempoReal(req,res){
	var items = req.query.items || 1000;
	items = Number(items);
	//OJO CAMBIAR NOMBRE DE COLLECCION Y CAMPOS SEGÚN LA CONSULTA
	Analoginput.find({})
	   .skip(0)
	   .limit(items)
	   .sort([['timestamp', -1]])	
	   .exec(
	   		(err, itemsFound) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando items'});
	   			}else{
	   				if(!itemsFound){
						res.status(404).send({message: 'Imposible mostrar información'});
					}else{	
		   				Analoginput.countDocuments({}, (err,conteo) =>{
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
	Analoginput.find({timestamp : {
					    '$gte': (new Date(desde)).getTime(),
					    '$lte': (new Date(hasta)).getTime()
						}
					})
	   .sort([['timestamp', 1]])	
	   .exec(
	   		(err, itemsFound) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando items'});
	   			}else{
	   				if(!itemsFound){
						res.status(404).send({message: 'Imposible mostrar información'});
					}else{
						//OJO CAMBIAR NOMBRE DE COLLECCION Y CAMPOS SEGÚN LA CONSULTA
		   				Analoginput.countDocuments({}, (err,conteo) =>{
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
// ELIMINAR ITEM
//================================================

function deleteItem(req,res){
	var itemId = req.params.id; // éste parámetro se pone en el url despues de /
	//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	Analoginput.findByIdAndRemove(itemId, (err, itemRemoved) => {
		if(err){
			res.status(500).send({message: 'Error al borrar registro'});
		}else{
			if(!itemRemoved){
				res.status(404).send({message: 'No existe registro con ese id'});
			}else{
				res.status(200).send({item: itemRemoved});
			}
		}
	});
}

module.exports = {
	registraItem,
	itemsTodos,
	itemsRangoTiempoReal,
	deleteItem,
	itemsRangoFechas

};
