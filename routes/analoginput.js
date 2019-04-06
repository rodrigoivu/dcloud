'use strict'

var express = require('express');
var AnaloginputController = require ('../controllers/analoginput');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './uploads/imgObjeto'});

 api.post('/registra-analoginput',[md_auth.ensureAuth, md_auth.ensureAdminUserBasico], AnaloginputController.registraItem);
 api.get('/analoginput-todos',[md_auth.ensureAuth,md_auth.ensureAdminUserBasico], AnaloginputController.itemsTodos);
 api.get('/analoginput-rango-fechas',[md_auth.ensureAuth,md_auth.ensureAdminUserBasico], AnaloginputController.itemsRangoFechas);
 api.get('/analoginput-rango-tiempo-real',[md_auth.ensureAuth,md_auth.ensureAdminUserBasico], AnaloginputController.itemsRangoTiempoReal);
 api.delete('/borra-analoginput/:id',[md_auth.ensureAuth,md_auth.ensureAdmin], AnaloginputController.deleteItem);
module.exports = api;