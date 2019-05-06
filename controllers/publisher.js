var mqtt = require('mqtt');
//var client  = mqtt.connect('mqtt://165.227.26.150'); //CEAPRO
//var client  = mqtt.connect('mqtt://18.228.196.66'); //AWS desimat
var client  = mqtt.connect('mqtt://52.67.210.196') 
var dataMqtt;

client.on('connect', function () {
    
	enviarMqtt();
	
 });

function enviarMqtt(){
	client.publish('desimat/control', dataMqtt);
}

function recibeOrden(socket){
		socket.on('recibeOrden', (data) => {
		   dataMqtt=data;	
           //console.log(data);
           enviarMqtt();
        });
}

module.exports = {
	recibeOrden,
	enviarMqtt
};