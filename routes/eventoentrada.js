'use strict'

var express = require('express');
//OJO CAMBIAR NOMBRE DE CONTROLLER SEGÚN LA CONSULTA
var EventoentradaController = require ('../controllers/eventoentrada');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './uploads/imgObjeto'});

 api.post('/registra-eventoentrada',[md_auth.ensureAuth, md_auth.ensureAdminUser], EventoentradaController.registraItem);
 api.get('/eventoentrada-todos',[md_auth.ensureAuth,md_auth.ensureAdminUser], EventoentradaController.itemsTodos);
 api.get('/eventoentrada-rango-fechas',[md_auth.ensureAuth,md_auth.ensureAdminUser], EventoentradaController.itemsRangoFechas);
 api.get('/eventoentrada-rango-ultimos',[md_auth.ensureAuth,md_auth.ensureAdminUser], EventoentradaController.itemsRangoUltimos);
 api.delete('/borra-eventoentrada/:id',[md_auth.ensureAuth,md_auth.ensureAdminUser], EventoentradaController.deleteItem);
module.exports = api;