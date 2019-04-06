'use strict'

var express = require('express');
var ObjetoController = require ('../controllers/objeto');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/imgObjeto'});

 api.post('/registra-objeto',[md_auth.ensureAuth, md_auth.ensureAdminUserBasico], ObjetoController.registraItem);
 api.put('/actualiza-objeto/:id',[md_auth.ensureAuth, md_auth.ensureAdmin], ObjetoController.actualizaItem);
 api.get('/busca-por-id-objeto/:id',[md_auth.ensureAuth, md_auth.ensureAdminUserBasico], ObjetoController.buscaPorId);
 api.get('/objeto-todos',[md_auth.ensureAuth,md_auth.ensureAdminUserBasico], ObjetoController.itemsTodos);
 api.get('/get-image-objeto/:imageFile',ObjetoController.getImageFile);
 api.put('/upload-image-objeto/:id',[md_auth.ensureAuth,md_auth.ensureAdmin, md_upload],ObjetoController.uploadImage);
module.exports = api;