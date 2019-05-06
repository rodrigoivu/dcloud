'use strict'
//OJO CAMBIAR NOMBRE DE COLLECCION Y MODEL SEGÚN LA CONSULTA
var Tagobjeto = require('../models/tagobjeto');

//================================================
// CREAR UN ITEM
//================================================

function registraItem(req,res){
	//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	var item = new Tagobjeto(req.body);
	//OJO CAMBIAR CONDICIONES SEGÚN MODELO
	if( item.tag !=null && item.objeto !=null && item.nserie !=null && item.nparte !=null){ //Indicar valores requeridos
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
		res.status(400).send({message: 'Falta indicar algún dato'});
	}
}

//================================================
// ACTUALIZAR UN ITEM
//================================================

function actualizaItem(req,res){
	var itemId = req.params.id; 
	var params = req.body;      
 	//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	Tagobjeto.findByIdAndUpdate(itemId, params, { new: true }, (err, itemUpdated) => { 
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
	Tagobjeto.findById(id, (err,itemFound) => { 
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
	Tagobjeto.find({},'tag objeto nserie nparte') 
	   .sort([['tag', 1]])	
	   .exec(
	   		(err, itemsFound) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando items'});
	   			}else{
	   				//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	   				Tagobjeto.countDocuments({}, (err,conteo) =>{
	   					res.status(200).send({
								items: itemsFound,
								total: conteo
						});
	   				});
	   				
	   			}
	   		}
	   	);
}


module.exports = {
	registraItem,
	actualizaItem,
	buscaPorId,
	itemsTodos
};
