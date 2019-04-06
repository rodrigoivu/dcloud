'use strict'

var express = require('express');
var AnalogoutputController = require ('../controllers/analogoutput');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './uploads/imgObjeto'});

 api.post('/registra-analogoutput',[md_auth.ensureAuth, md_auth.ensureAdmin], AnalogoutputController.registraItem);
 api.put('/actualiza-analogoutput/:id',[md_auth.ensureAuth, md_auth.ensureAdmin], AnalogoutputController.actualizaItem);
 api.get('/analogoutput-todos',[md_auth.ensureAuth,md_auth.ensureAdminUserBasico], AnalogoutputController.itemsTodos);
 api.delete('/borra-analogoutput/:id',[md_auth.ensureAuth,md_auth.ensureAdmin], AnalogoutputController.deleteItem);
module.exports = api;