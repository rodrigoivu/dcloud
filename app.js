'use strict'

var express = require ('express');
var bodyParser = require ('body-parser');
var path = require('path');
var app = express();


// cargar rutas
//var subsignal_routes = require('./routes/subsignal');
var user_routes = require('./routes/user');
var sendmail_routes = require('./routes/sendmail');
var objeto_routes = require('./routes/objeto');
var persona_routes = require('./routes/persona');
var nuevotag_routes = require('./routes/nuevotag');
var tagobjeto_routes = require('./routes/tagobjeto');
var digitalinput_routes = require('./routes/digitalinput');
var analoginput_routes = require('./routes/analoginput');
var eventoentrada_routes = require('./routes/eventoentrada');
var elementocanvas_routes = require('./routes/elementocanvas');
var analogoutput_routes = require('./routes/analogoutput');
var digitaloutput_routes = require('./routes/digitaloutput');
var configuracion_routes = require('./routes/configuracion');
var elementocanvasdi_routes = require('./routes/elementocanvasdi');
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({extended:false}));
// create application/json parser
app.use(bodyParser.json());

// CORS configurar cabeceras http
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin','*'); //permite el acceso a todos los dominios, a las apis
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-Whith, Content-Type, Accept,Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
	next();
});
app.use('/',express.static('client', { redirect: false }));
//app.use('/api', subsignal_routes);
app.use('/api', user_routes);
app.use('/api', sendmail_routes);
app.use('/api', objeto_routes);
app.use('/api', persona_routes);
app.use('/api', nuevotag_routes);
app.use('/api', tagobjeto_routes);
app.use('/api', analoginput_routes);
app.use('/api', digitalinput_routes);
app.use('/api', eventoentrada_routes);
app.use('/api', elementocanvas_routes);
app.use('/api', analogoutput_routes);
app.use('/api', digitaloutput_routes);
app.use('/api', configuracion_routes);
app.use('/api', elementocanvasdi_routes);

app.get('*', function(req,res,next){
	res.sendFile(path.resolve('./client/index.html'));
});

module.exports = app;