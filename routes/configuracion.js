'use strict'

var express = require('express');
var ConfiguracionController = require ('../controllers/configuracion');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/planta'});

 api.post('/registra-configuracion',[md_auth.ensureAuth, md_auth.ensureAdminUser], ConfiguracionController.registraItem);
 api.put('/actualiza-configuracion/:id',[md_auth.ensureAuth, md_auth.ensureAdminUser], ConfiguracionController.actualizaItem);
 api.get('/configuracion-ultimo',[md_auth.ensureAuth,md_auth.ensureAdminUser], ConfiguracionController.itemUltimo);
 api.put('/upload-image-configuracion/:id',[md_auth.ensureAuth,md_auth.ensureAdminUser, md_upload],ConfiguracionController.uploadImage);
 api.put('/upload-image-logo-configuracion/:id',[md_auth.ensureAuth,md_auth.ensureAdminUser, md_upload],ConfiguracionController.uploadImageLogo);
 api.put('/upload-image-corporativa-configuracion/:id',[md_auth.ensureAuth,md_auth.ensureAdminUser, md_upload],ConfiguracionController.uploadImageCorporativa);
 api.get('/get-image-configuracion/:imageFile',ConfiguracionController.getImageFile);
module.exports = api;