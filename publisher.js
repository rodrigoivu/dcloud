var mqtt = require('mqtt');

//var client  = mqtt.connect('mqtt://192.168.0.8');
//var client  = mqtt.connect('mqtt://18.228.196.66') //AWS desimat
var client  = mqtt.connect('mqtt://18.228.220.40'); //remote waters


client.on('connect', function () {
    
	//client.publish('getsignalplc001', 'resultado');
	
});

