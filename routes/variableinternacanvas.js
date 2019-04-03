'use strict'

var express = require('express');
var VariableinternacanvasController = require ('../controllers/variableinternacanvas');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './uploads/imgObjeto'});

 api.post('/registra-variableinternacanvas',[md_auth.ensureAuth, md_auth.ensureAdminUser], VariableinternacanvasController.registraItem);
 api.put('/actualiza-variableinternacanvas/:id',[md_auth.ensureAuth, md_auth.ensureAdminUser], VariableinternacanvasController.actualizaItem);
 api.get('/variableinternacanvas-todos',[md_auth.ensureAuth,md_auth.ensureAdminUser], VariableinternacanvasController.itemsTodos);
 api.delete('/borra-variableinternacanvas/:id',[md_auth.ensureAuth,md_auth.ensureAdminUser], VariableinternacanvasController.deleteItem);
module.exports = api;