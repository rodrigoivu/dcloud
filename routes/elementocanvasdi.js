'use strict'

var express = require('express');
var ElementocanvasdiController = require ('../controllers/elementocanvasdi');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './uploads/imgObjeto'});

 api.post('/registra-elementocanvasdi',[md_auth.ensureAuth, md_auth.ensureAdminUser], ElementocanvasdiController.registraItem);
 api.put('/actualiza-elementocanvasdi/:id',[md_auth.ensureAuth, md_auth.ensureAdminUser], ElementocanvasdiController.actualizaItem);
 api.get('/elementocanvasdi-todos',[md_auth.ensureAuth,md_auth.ensureAdminUser], ElementocanvasdiController.itemsTodos);
 api.delete('/borra-elementocanvasdi/:id',[md_auth.ensureAuth,md_auth.ensureAdminUser], ElementocanvasdiController.deleteItem);
module.exports = api;