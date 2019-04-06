'use strict'

var express = require('express');
var DigitalinputController = require ('../controllers/digitalinput');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './uploads/imgObjeto'});

 api.post('/registra-digitalinput',[md_auth.ensureAuth, md_auth.ensureAdminUserBasico], DigitalinputController.registraItem);
 api.get('/digitalinput-todos',[md_auth.ensureAuth,md_auth.ensureAdminUserBasico], DigitalinputController.itemsTodos);
 api.get('/digitalinput-rango-fechas',[md_auth.ensureAuth,md_auth.ensureAdminUserBasico], DigitalinputController.itemsRangoFechas);
 api.delete('/borra-digitalinput/:id',[md_auth.ensureAuth,md_auth.ensureAdmin], DigitalinputController.deleteItem);
 api.get('/digitalinput-ultimo',[md_auth.ensureAuth,md_auth.ensureAdminUserBasico], DigitalinputController.itemUltimo);
module.exports = api;