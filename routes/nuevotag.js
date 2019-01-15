'use strict'

var express = require('express');
var NuevotagController = require ('../controllers/nuevotag');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './uploads/imgObjeto'});

 api.post('/registra-nuevotag',[md_auth.ensureAuth, md_auth.ensureAdminUser], NuevotagController.registraItem);
 api.put('/actualiza-nuevotag/:id',[md_auth.ensureAuth, md_auth.ensureAdminUser], NuevotagController.actualizaItem);
 api.get('/busca-por-id-nuevotag/:id',[md_auth.ensureAuth, md_auth.ensureAdminUser], NuevotagController.buscaPorId);
 api.get('/nuevotag-todos',[md_auth.ensureAuth,md_auth.ensureAdminUser], NuevotagController.itemsTodos);
 api.delete('/borra-nuevotag/:id',[md_auth.ensureAuth,md_auth.ensureAdminUser], NuevotagController.deleteItem);
module.exports = api;