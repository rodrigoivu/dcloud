'use strict'

var express = require('express');
var DigitalinputController = require ('../controllers/digitalinput');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './uploads/imgObjeto'});

 api.post('/registra-digitalinput',[md_auth.ensureAuth, md_auth.ensureAdminUser], DigitalinputController.registraItem);
 api.get('/digitalinput-todos',[md_auth.ensureAuth,md_auth.ensureAdminUser], DigitalinputController.itemsTodos);
 api.get('/digitalinput-rango-fechas',[md_auth.ensureAuth,md_auth.ensureAdminUser], DigitalinputController.itemsRangoFechas);
 api.delete('/borra-digitalinput/:id',[md_auth.ensureAuth,md_auth.ensureAdminUser], DigitalinputController.deleteItem);
 api.get('/digitalinput-ultimo',[md_auth.ensureAuth,md_auth.ensureAdminUser], DigitalinputController.itemUltimo);
module.exports = api;