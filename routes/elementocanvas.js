'use strict'

var express = require('express');
var ElementocanvasController = require ('../controllers/elementocanvas');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './uploads/imgObjeto'});

 api.post('/registra-elementocanvas',[md_auth.ensureAuth, md_auth.ensureAdminUser], ElementocanvasController.registraItem);
 api.put('/actualiza-elementocanvas/:id',[md_auth.ensureAuth, md_auth.ensureAdminUser], ElementocanvasController.actualizaItem);
 api.get('/elementocanvas-todos',[md_auth.ensureAuth,md_auth.ensureAdminUser], ElementocanvasController.itemsTodos);
 api.delete('/borra-elementocanvas/:id',[md_auth.ensureAuth,md_auth.ensureAdminUser], ElementocanvasController.deleteItem);
module.exports = api;