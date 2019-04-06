'use strict'

var express = require('express');
//OJO CAMBIAR NOMBRE DE CONTROLLER SEGÚN LA CONSULTA
var EventotagpersonaController = require ('../controllers/eventotagpersona');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './uploads/imgObjeto'});

api.get('/eventotagpersona-todos',[md_auth.ensureAuth,md_auth.ensureAdminUserBasico], EventotagpersonaController.itemsTodos);
api.get('/eventotagpersona-rango-fechas',[md_auth.ensureAuth,md_auth.ensureAdminUserBasico], EventotagpersonaController.itemsRangoFechas);
api.get('/eventotagpersona-rango-ultimos',[md_auth.ensureAuth,md_auth.ensureAdminUserBasico], EventotagpersonaController.itemsRangoUltimos);
 
module.exports = api;