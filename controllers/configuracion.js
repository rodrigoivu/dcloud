'use strict'
var fs = require('fs');
var path = require('path');
//OJO CAMBIAR NOMBRE DE COLLECCION Y MODEL SEGÚN LA CONSULTA
var Configuracion = require('../models/configuracion');

//================================================
// CREAR UN ITEM
//================================================
function registraItem(req,res){
	//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	var item = new Configuracion(req.body);
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
// ACTUALIZAR UN ITEM
//================================================
function actualizaItem(req,res){
	var itemId = req.params.id; 
	var params = req.body;      
 	//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	Configuracion.findByIdAndUpdate(itemId, params, { new: true }, (err, itemUpdated) => { 
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
//================================================
// ENCUENTRA EL ULTIMO
//================================================
function itemUltimo(req,res){
	//OJO CAMBIAR NOMBRE DE COLLECCION Y CAMPOS SEGÚN LA CONSULTA
	Configuracion.findOne({}) 
	   //.sort([['timestamp', -1]])
	   .sort({ timestamp: -1 })
	   .exec(
	   		(err, itemsFound) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando items'});
	   			}else{
	   				res.status(200).send({
						item: itemsFound
					});
	   			}
	   		});
}
//================================================
// CARGAR IMAGEN
//================================================
function uploadImage(req,res){
	var configId =req.params.id;
	if(req.files){
		var file_path = req.files.image.path;
		var file_ext = path.extname(file_path);
		var extensionesValidas = ['.jpg'];
		if( extensionesValidas.indexOf(file_ext) >= 0 ){
			//personalizar Nombre
			var nombreArchivo = `planta.jpg`;
			var path_destino = `./uploads/planta/${nombreArchivo}`;
			//Mover archivo
			fs.rename( file_path,path_destino, function(err){
				if (err){
					res.status(500).send({message: 'Error al mover archivo'});
				}else{
					//Actualizar nombre en base de datos
					Configuracion.findByIdAndUpdate(configId, {image: nombreArchivo}, (err, itemUpdated) => {
						if(!itemUpdated){
							res.status(404).send({message: 'No se ha podido actualizar el usuario'});
					    }else{
					    	//NO SE NECESITA ELIMINAR YA QUE ES EL MISMO NOMBRE SE REESCRIBE
					    	//Elimina imagen anterior
					    	// var pathViejo = './uploads/planta/' + itemUpdated.image;
					    	// if( fs.existsSync(pathViejo)){
		    		  //           fs.unlink( pathViejo , err =>{
		    			 //          if(err) return console.log(err);
          //                         console.log('file deleted successfully');
		    		  //           });
		    	   //          }
        				    res.status(200).send({ item: itemUpdated, archivo: nombreArchivo });
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

//================================================
// CARGAR IMAGEN LOGO
//================================================
// function uploadImageLogo(req,res){
// 	var configId =req.params.id;
// 	if(req.files){
// 		var file_path = req.files.image.path;
// 		var file_ext = path.extname(file_path);
// 		var extensionesValidas = ['.png'];
// 		if( extensionesValidas.indexOf(file_ext) >= 0 ){
// 			//personalizar Nombre
// 			var nombreArchivo = `imgLogo.png`;
// 			var path_destino = `./uploads/planta/${nombreArchivo}`;
// 			//Mover archivo
// 			fs.rename( file_path,path_destino, function(err){
// 				if (err){
// 					res.status(500).send({message: 'Error al mover archivo'});
// 				}else{
// 					//Actualizar nombre en base de datos
// 					Configuracion.findByIdAndUpdate(configId, {image: nombreArchivo}, (err, itemUpdated) => {
// 						if(!itemUpdated){
// 							res.status(404).send({message: 'No se ha podido actualizar el usuario'});
// 					    }else{
//         				    res.status(200).send({ item: itemUpdated, archivo: nombreArchivo });
// 					    }
// 					});
// 				}
// 			});
// 		}else{
// 			res.status(400).send({message: 'Extención del archivo no válida'});
// 		}
		
// 	}else{
// 		res.status(400).send({message: 'No has subido ninguna imagen...'});
// 	}
// }
//================================================
// CARGAR IMAGEN LOGO
//================================================
function uploadImageLogo(req,res){
	var configId =req.params.id;
	if(req.files){
		var file_path = req.files.image.path;
		var file_ext = path.extname(file_path);
		var extensionesValidas = ['.png'];
		if( extensionesValidas.indexOf(file_ext) >= 0 ){
			//personalizar Nombre
			var nombreArchivo = `imgLogo.png`;
			var path_destino = `./uploads/planta/${nombreArchivo}`;
			//Mover archivo
			fs.rename( file_path,path_destino, function(err){
				if (err){
					res.status(500).send({message: 'Error al mover archivo'});
				}else{
					//Actualizar nombre en base de datos
					Configuracion.findByIdAndUpdate(configId, {imagelogo: nombreArchivo}, (err, itemUpdated) => {
						if(!itemUpdated){
							res.status(404).send({message: 'No se ha podido actualizar imagen logo'});
					    }else{
        				    res.status(200).send({ item: itemUpdated, archivo: nombreArchivo });
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

//================================================
// CARGAR IMAGEN CORPORATIVA
//================================================
function uploadImageCorporativa(req,res){
	var configId =req.params.id;
	if(req.files){
		var file_path = req.files.image.path;
		var file_ext = path.extname(file_path);
		var extensionesValidas = ['.jpg'];
		if( extensionesValidas.indexOf(file_ext) >= 0 ){
			//personalizar Nombre
			var nombreArchivo = `imgCorporativa.jpg`;
			var path_destino = `./uploads/planta/${nombreArchivo}`;
			//Mover archivo
			fs.rename( file_path,path_destino, function(err){
				if (err){
					res.status(500).send({message: 'Error al mover archivo'});
				}else{
					//Actualizar nombre en base de datos
					Configuracion.findByIdAndUpdate(configId, {imagecorporativa: nombreArchivo}, (err, itemUpdated) => {
						if(!itemUpdated){
							res.status(404).send({message: 'No se ha podido actualizar imagen corporativa'});
					    }else{
        				    res.status(200).send({ item: itemUpdated, archivo: nombreArchivo });
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

//================================================
// OBTENER IMAGEN
//================================================
function getImageFile(req,res){
	var imageFile = req.params.imageFile;
	var path_file = path.resolve(__dirname, `../uploads/planta/${ imageFile }`);
	if( fs.existsSync( path_file ) ){
		res.sendFile(path_file);
	}else{
		var pathNoImage = path.resolve( __dirname, '../assets/no-img.jpg');
		res.sendFile(pathNoImage);
	}
}

module.exports = {
	registraItem,
	actualizaItem,
	itemUltimo,
	uploadImage,
	uploadImageLogo,
	uploadImageCorporativa,
	getImageFile
};