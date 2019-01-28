var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://165.227.26.150')
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