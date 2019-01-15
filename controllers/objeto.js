'use strict'
var fs = require('fs');
var path = require('path');
//OJO CAMBIAR NOMBRE DE COLLECCION Y MODEL SEGÚN LA CONSULTA
var Objeto = require('../models/objeto');

//================================================
// CREAR UN ITEM
//================================================

function registraItem(req,res){
	//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	var item = new Objeto(req.body);
	//OJO CAMBIAR CONDICIONES SEGÚN MODELO
	if( item.tipo !=null && item.descripcion !=null){ //Indicar valores requeridos
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
		//OJO CAMBIAR MENSAJE SEGUN CONDICIONES DE LA FUNCION
		res.status(400).send({message: 'Falta indicar Tipo o Descripción'});
	}
}

//================================================
// ACTUALIZAR UN ITEM
//================================================

function actualizaItem(req,res){
	var itemId = req.params.id; 
	var params = req.body;      
 	//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	Objeto.findByIdAndUpdate(itemId, params, { new: true }, (err, itemUpdated) => { 
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
	Objeto.findById(id, (err,itemFound) => { 
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

	//OJO CAMBIAR NOMBRE DE COLLECCION Y LOS CAMPOS SEGÚN LA CONSULTA
	Objeto.find({},'tipo descripcion info disciplina categoria grupo stockmin stock imagen') 
	   .sort([['descripcion', 1]])	
	   .exec(
	   		(err, itemsFound) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando items'});
	   			}else{
	   				//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	   				Objeto.countDocuments({}, (err,conteo) =>{
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
// OBTENER IMAGEN
//================================================

function getImageFile(req,res){
	var imageFile = req.params.imageFile;
	//OJO CAMBIAR DESTINO SEGÚN FUNCION
	var path_file = path.resolve(__dirname, `../uploads/imgObjeto/${ imageFile }`);

	if( fs.existsSync( path_file ) ){
		res.sendFile(path_file);
	}else{
		var pathNoImage = path.resolve( __dirname, '../assets/no-img.jpg');
		res.sendFile(pathNoImage);
	}
}

//================================================
// CARGAR IMAGEN
//================================================

function uploadImage(req,res){
	var itemId =req.params.id;
	if(req.files){
		var file_path = req.files.image.path;
		var file_ext = path.extname(file_path);
		var extensionesValidas = [ '.png', '.jpg', '.gif', '.jpeg', '.bmp'];
		if( extensionesValidas.indexOf(file_ext) >= 0 ){
			//personalizar Nombre
			var nombreArchivo = `${itemId}-${ new Date().getMilliseconds() }${ file_ext }`;
			//OJO CAMBIAR DESTINO SEGÚN FUNCION
			var path_destino = `./uploads/imgObjeto/${nombreArchivo}`;
			//Mover archivo
			fs.rename( file_path,path_destino, function(err){
					if (err){
						res.status(500).send({message: 'Error al mover archivo'});
					}else{
						//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
						Objeto.findByIdAndUpdate(itemId, {imagen: nombreArchivo}, (err, itemUpdated) => {
 	 						if(!itemUpdated){
								res.status(404).send({message: 'No se ha podido actualizar el usuario'});
						    }else{
						    	//Elimina imagen anterior
						    	//OJO CAMBIAR DESTINO SEGÚN FUNCION
						    	var pathViejo = './uploads/imgUser/' + itemUpdated.image;
						    	if( fs.existsSync(pathViejo)){
			    		            fs.unlink( pathViejo , err =>{
			    			          if(err) return console.log(err);
                                      console.log('file deleted successfully');
			    		            });
			    				}
            				    res.status(200).send({ 
            				    	item: itemUpdated, 
            				    	image: nombreArchivo 
            				    });
						    }
						});
					}
			});
		}else{
			res.status(400).send({message: 'Extención del archivo no válida'});
		}
	}else{
		res.status(400).send({message: 'No has subido ninguna imagen...'});
	}
}

module.exports = {
	registraItem,
	actualizaItem,
	buscaPorId,
	itemsTodos,
	getImageFile,
	uploadImage
};
