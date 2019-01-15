'use strict'
//OJO CAMBIAR NOMBRE DE COLLECCION Y MODEL SEGÚN LA CONSULTA
var Nuevotag = require('../models/nuevotag');

//================================================
// CREAR UN ITEM
//================================================

function registraItem(req,res){
	//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	var item = new Nuevotag(req.body);
	//OJO CAMBIAR CONDICIONES SEGÚN MODELO
	if( item.tag !=null ){ //Indicar valores requeridos
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
	}else{
		//OJO CAMBIAR MENSAJE SEGUN CONDICIONES DE LA FUNCIO
		res.status(400).send({message: 'Falta indicar Tag'});
	}
}

//================================================
// ACTUALIZAR UN ITEM
//================================================

function actualizaItem(req,res){
	var itemId = req.params.id; 
	var params = req.body;      
 	//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	Nuevotag.findByIdAndUpdate(itemId, params, { new: true }, (err, itemUpdated) => { 
		if(err){
			res.status(500).send({
				error: err,
				message: 'Error al actualizar item'
			});
		}else{
			if(!itemUpdated){
				res.status(404).send({
					message: 'Imposible actualizar item',
			    });
			}else{
				res.status(200).send({
					item: itemUpdated,
				});
			}
		}
	});
}

function buscaPorId(req,res){
	var id = req.params.id;
	//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	Nuevotag.findById(id, (err,itemFound) => { 
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!itemFound){
				res.status(404).send({message: 'Imposible rescatar el item'});
			}else{
				res.status(200).send({
					item: itemFound	
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
	Nuevotag.find({},'tag destino') 
	   .sort([['tag', 1]])	
	   .exec(
	   		(err, itemsFound) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando items'});
	   			}else{
	   				//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	   				Nuevotag.countDocuments({}, (err,conteo) =>{
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
// ELIMINAR ITEM
//================================================

function deleteItem(req,res){
	var itemId = req.params.id; // éste parámetro se pone en el url despues de /
	//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	Nuevotag.findByIdAndRemove(itemId, (err, itemRemoved) => {
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
	actualizaItem,
	buscaPorId,
	itemsTodos,
	deleteItem
};
