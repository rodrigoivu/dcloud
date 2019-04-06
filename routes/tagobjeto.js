'use strict'

var express = require('express');
var TagobjetoController = require ('../controllers/tagobjeto');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './uploads/imgObjeto'});

 api.post('/registra-tagobjeto',[md_auth.ensureAuth, md_auth.ensureAdminUserBasico], TagobjetoController.registraItem);
 api.put('/actualiza-tagobjeto/:id',[md_auth.ensureAuth, md_auth.ensureAdmin], TagobjetoController.actualizaItem);
 api.get('/busca-por-id-tagobjeto/:id',[md_auth.ensureAuth, md_auth.ensureAdminUserBasico], TagobjetoController.buscaPorId);
 api.get('/tagobjeto-todos',[md_auth.ensureAuth,md_auth.ensureAdminUserBasico], TagobjetoController.itemsTodos);
module.exports = api;