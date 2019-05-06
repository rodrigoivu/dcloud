'use strict'

var fs = require('fs');
var path = require('path');
//OJO CAMBIAR NOMBRE DE COLLECCION Y MODEL SEGÚN LA CONSULTA
var Persona = require('../models/persona');

//================================================
// CREAR UN ITEM
//================================================

function registraItem(req,res){
	//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	var item = new Persona(req.body);
	//OJO CAMBIAR CONDICIONES SEGÚN MODELO
	if( item.rut !=null && item.nombre !=null && item.tag !=null){ //Indicar valores requeridos
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
		res.status(400).send({message: 'Falta indicar Rut, Nombre o Tag'});
	}
}

//================================================
// ACTUALIZAR UN ITEM
//================================================

function actualizaItem(req,res){
	var itemId = req.params.id; 
	var params = req.body;      
 	//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	Persona.findByIdAndUpdate(itemId, params, { new: true }, (err, itemUpdated) => { 
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
	Persona.findById(id, (err,itemFound) => { 
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
	//Persona.find({},'rut nombre tag empresa cargo area imagen autorizado fechaincorporacion tipolicenciaconducir mutualidad fechaexamenocupacional fechaexamenalturafisica fechaexamenalturageo archivoexamen1 archivoexamen2 archivoexamen3 archivocontrato fechafincontrato') 
	Persona.find({}) 
	   .sort([['nombre', 1]])	
	   .exec(
	   		(err, itemsFound) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando items'});
	   			}else{
	   				//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	   				Persona.countDocuments({}, (err,conteo) =>{
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
	var path_file = path.resolve(__dirname, `../uploads/imgPersona/${ imageFile }`);

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
			var path_destino = `./uploads/imgPersona/${nombreArchivo}`;
			//Mover archivo
			fs.rename( file_path,path_destino, function(err){
					if (err){
						res.status(500).send({message: 'Error al mover archivo'});
					}else{
						//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
						Persona.findByIdAndUpdate(itemId, {imagen: nombreArchivo}, (err, itemUpdated) => {
 	 						if(!itemUpdated){
								res.status(404).send({message: 'No se ha podido actualizar la persona'});
						    }else{
						    	//Elimina imagen anterior
						    	//OJO CAMBIAR DESTINO SEGÚN FUNCION
						    	var pathViejo = './uploads/imgPersona/' + itemUpdated.image;
						    	eliminaArchivo(pathViejo);
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

//================================================
// CARGAR ARCHIVO
//================================================

function uploadFilePdf(req,res){
	var itemId = req.params.id;
	var opcion = req.params.opcion;
	var responsable = req.params.responsable

	if(req.files){
		var file_path = req.files.archivo.path;
		var file_ext = path.extname(file_path);
		var extensionesValidas = [ '.pdf' ];

		if( extensionesValidas.indexOf(file_ext) >= 0 ){
		//personalizar Nombre
			var nombreArchivo = `${opcion}-${itemId}-${ new Date().getMilliseconds() }${ file_ext }`;
			//OJO CAMBIAR DESTINO DE ARCHIVO
			var path_destino = `./uploads/pdfPersona/${nombreArchivo}`;
			//Mover archivo
			fs.rename( file_path,path_destino, function(err){
				if (err){
					res.status(500).send({message: 'Error al mover archivo'});
				}else{
					switch (opcion) {
					    case "archivoexamen1": //examen ocupacional
					        Persona.findByIdAndUpdate(itemId, {archivoexamen1: nombreArchivo, responsablearchivoexamen1: responsable}, (err, itemUpdated) => {
	 							if(itemUpdated){
							    	var pathViejo = './uploads/pdfPersona/' + itemUpdated.archivoexamen1;
	 						    	eliminaArchivo(pathViejo);
	            				    res.status(200).send({ item: itemUpdated, archivo: nombreArchivo });
							}});
					        break;
					    case "archivoexamen2": //examen altura fisica
					        Persona.findByIdAndUpdate(itemId, {archivoexamen2: nombreArchivo, responsablearchivoexamen2: responsable}, (err, itemUpdated) => {
	 							if(itemUpdated){
							    	var pathViejo = './uploads/pdfPersona/' + itemUpdated.archivoexamen2;
	 						    	eliminaArchivo(pathViejo);
	            				    res.status(200).send({ item: itemUpdated, archivo: nombreArchivo });
							}});
					        break;
					    case "archivoexamen3": //examen altura geografica
					        Persona.findByIdAndUpdate(itemId, {archivoexamen3: nombreArchivo, responsablearchivoexamen3: responsable}, (err, itemUpdated) => {
	 							if(itemUpdated){
							    	var pathViejo = './uploads/pdfPersona/' + itemUpdated.archivoexamen3;
	 						    	eliminaArchivo(pathViejo);
	            				    res.status(200).send({ item: itemUpdated, archivo: nombreArchivo });
							}});
					        break;
					    case "archivocontrato":
					        Persona.findByIdAndUpdate(itemId, {archivocontrato: nombreArchivo, responsablearchivocontrato: responsable}, (err, itemUpdated) => {
	 							if(itemUpdated){
							    	var pathViejo = './uploads/pdfPersona/' + itemUpdated.archivocontrato;
	 						    	eliminaArchivo(pathViejo);
	            				    res.status(200).send({ item: itemUpdated, archivo: nombreArchivo });
							}});
					        break;
					}
				}
			});
		}else{
			res.status(400).send({message: 'Extención del archivo no válida'});
		}
	}else{
		res.status(400).send({message: 'No has subido ningún archivo...'});
	}
}

function eliminaArchivo(pathViejo){
	if( fs.existsSync(pathViejo)){
	    fs.unlink( pathViejo , err =>{
	        if(err) return console.log(err);
               console.log('file deleted successfully');
	        });
	}
}

//================================================
// OBTENER ARCHIVO
//================================================

function getFilePdf(req,res){
	var file = req.params.file;
	var path_file = path.resolve(__dirname, `../uploads/pdfPersona/${ file }`);

	if( fs.existsSync( path_file ) ){
		res.sendFile(path_file);
	}else{
		var pathNoImage = path.resolve( __dirname, '../assets/no-pdf.jpg');
		res.sendFile(pathNoImage);
	}
}

module.exports = {
	registraItem,
	actualizaItem,
	buscaPorId,
	itemsTodos,
	getImageFile,
	getFilePdf,
	uploadImage,
	uploadFilePdf
};