'use strict'

var express = require('express');
var VariableinternaController = require ('../controllers/variableinterna');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './uploads/imgObjeto'});

 api.post('/registra-variableinterna',[md_auth.ensureAuth, md_auth.ensureAdminUser], VariableinternaController.registraItem);
 api.get('/variableinterna-todos',[md_auth.ensureAuth,md_auth.ensureAdminUser], VariableinternaController.itemsTodos);
 api.get('/variableinterna-rango-fechas',[md_auth.ensureAuth,md_auth.ensureAdminUser], VariableinternaController.itemsRangoFechas);
 api.get('/variableinterna-rango-tiempo-real',[md_auth.ensureAuth,md_auth.ensureAdminUser], VariableinternaController.itemsRangoTiempoReal);
 api.delete('/borra-variableinterna/:id',[md_auth.ensureAuth,md_auth.ensureAdminUser], VariableinternaController.deleteItem);
module.exports = api;