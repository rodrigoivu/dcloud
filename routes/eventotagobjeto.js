'use strict'

var express = require('express');
//OJO CAMBIAR NOMBRE DE CONTROLLER SEGÚN LA CONSULTA
var EventotagobjetoController = require ('../controllers/eventotagobjeto');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './uploads/imgObjeto'});

api.get('/eventotagobjeto-todos',[md_auth.ensureAuth,md_auth.ensureAdminUserBasico], EventotagobjetoController.itemsTodos);
api.get('/eventotagobjeto-rango-fechas',[md_auth.ensureAuth,md_auth.ensureAdminUserBasico], EventotagobjetoController.itemsRangoFechas);
api.get('/eventotagobjeto-rango-ultimos',[md_auth.ensureAuth,md_auth.ensureAdminUserBasico], EventotagobjetoController.itemsRangoUltimos);
 
module.exports = api;