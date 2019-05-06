var mqtt = require('mqtt');

//var client  = mqtt.connect('mqtt://192.168.0.8');
//var client  = mqtt.connect('mqtt://165.227.26.150')
//var client  = mqtt.connect('mqtt://18.228.196.66') //AWS desimat
//var client  = mqtt.connect('mqtt://18.228.220.40') //AWS desimat cliente remote waters
var client  = mqtt.connect('mqtt://52.67.210.196') //AWS desimat

client.on('connect', function () {
    
	client.publish('getsignalplc001', 'resultado');
	
});

