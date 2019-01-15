var mqtt = require('mqtt');

//var client  = mqtt.connect('mqtt://192.168.0.8');
var client  = mqtt.connect('mqtt://165.227.26.150')



client.on('connect', function () {
    
	client.publish('getsignalplc001', 'resultado');
	
});

