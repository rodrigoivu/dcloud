var SubscriberController = require('./controllers/subscriber');


var mqtt = require('mqtt')
//var client  = mqtt.connect('mqtt://192.168.0.8')
//var client  = mqtt.connect('mqtt://165.227.26.150') //ceapro
//var client  = mqtt.connect('mqtt://18.228.196.66') //AWS desimat
//var client  = mqtt.connect('mqtt://18.228.220.40') //AWS desimat cliente remote waters
var client  = mqtt.connect('mqtt://52.67.210.196') //rfid.desimat.cl

client.on('connect', () => {
    client.subscribe('desimat/estado');
})
client.on('message', (topic, message) => {
  
  SubscriberController.filtraMensaje(topic, message);
  
})

