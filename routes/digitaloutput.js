'use strict'

var express = require('express');
var DigitaloutputController = require ('../controllers/digitaloutput');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './uploads/imgObjeto'});

 api.post('/registra-digitaloutput',[md_auth.ensureAuth, md_auth.ensureAdmin], DigitaloutputController.registraItem);
 api.put('/actualiza-digitaloutput/:id',[md_auth.ensureAuth, md_auth.ensureAdmin], DigitaloutputController.actualizaItem);
 api.get('/digitaloutput-todos',[md_auth.ensureAuth,md_auth.ensureAdminUserBasico], DigitaloutputController.itemsTodos);
 api.delete('/borra-digitaloutput/:id',[md_auth.ensureAuth,md_auth.ensureAdmin], DigitaloutputController.deleteItem);
module.exports = api;