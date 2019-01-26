'use strict'

var express = require('express');
var PushnotificationsController = require ('../controllers/pushnotifications');

var api = express.Router();

api.get('/subscription', PushnotificationsController.pushSubscribir);
api.post('/sendNotification', PushnotificationsController.pushNotificar);
 

module.exports = api;