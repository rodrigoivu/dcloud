'use strict'

var express = require('express');
var NuevotagController = require ('../controllers/nuevotag');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './uploads/imgObjeto'});

 api.post('/registra-nuevotag',[md_auth.ensureAuth, md_auth.ensureAdminUserBasico], NuevotagController.registraItem);
 api.put('/actualiza-nuevotag/:id',[md_auth.ensureAuth, md_auth.ensureAdmin], NuevotagController.actualizaItem);
 api.get('/busca-por-id-nuevotag/:id',[md_auth.ensureAuth, md_auth.ensureAdminUserBasico], NuevotagController.buscaPorId);
 api.get('/nuevotag-todos',[md_auth.ensureAuth,md_auth.ensureAdminUserBasico], NuevotagController.itemsTodos);
 api.delete('/borra-nuevotag/:id',[md_auth.ensureAuth,md_auth.ensureAdmin], NuevotagController.deleteItem);
module.exports = api;