'use strict'

var express = require('express');
var ElementocanvasdiController = require ('../controllers/elementocanvasdi');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './uploads/imgObjeto'});

 api.post('/registra-elementocanvasdi',[md_auth.ensureAuth, md_auth.ensureAdmin], ElementocanvasdiController.registraItem);
 api.put('/actualiza-elementocanvasdi/:id',[md_auth.ensureAuth, md_auth.ensureAdmin], ElementocanvasdiController.actualizaItem);
 api.get('/elementocanvasdi-todos',[md_auth.ensureAuth,md_auth.ensureAdminUserBasico], ElementocanvasdiController.itemsTodos);
 api.delete('/borra-elementocanvasdi/:id',[md_auth.ensureAuth,md_auth.ensureAdmin], ElementocanvasdiController.deleteItem);
module.exports = api;