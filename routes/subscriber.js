'use strict'

var express = require('express');

var SubsignalController = require('../controllers/subsignal');

var api = express.Router();

api.get('/signals', SubsignalController.listSignals);
api.get('/signalsall', SubsignalController.listSignalsAll);
 
module.exports = api;