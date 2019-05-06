'use strict'

var express = require('express');
var PersonaController = require ('../controllers/persona');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/imgPersona'});
var md_upload_pdf = multipart({ uploadDir: './uploads/pdfPersona'});

 api.post('/registra-persona',[md_auth.ensureAuth, md_auth.ensureAdminUserBasico], PersonaController.registraItem);
 api.put('/actualiza-persona/:id',[md_auth.ensureAuth, md_auth.ensureAdmin], PersonaController.actualizaItem);
 api.get('/busca-por-id-persona/:id',[md_auth.ensureAuth, md_auth.ensureAdminUserBasico], PersonaController.buscaPorId);
 api.get('/persona-todos',[md_auth.ensureAuth,md_auth.ensureAdminUserBasico], PersonaController.itemsTodos);
 api.get('/get-image-persona/:imageFile',PersonaController.getImageFile);
 api.get('/get-pdf-persona/:file',PersonaController.getFilePdf);
 api.put('/upload-image-persona/:id',[md_auth.ensureAuth,md_auth.ensureAdmin, md_upload],PersonaController.uploadImage);
 api.put('/upload-pdf-persona/:id/:opcion/:responsable',[md_auth.ensureAuth,md_auth.ensureAdmin, md_upload_pdf],PersonaController.uploadFilePdf);
module.exports = api;