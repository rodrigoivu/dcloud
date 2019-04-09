var SubscriberController = require('./controllers/subscriber');


var mqtt = require('mqtt')
//var client  = mqtt.connect('mqtt://192.168.0.8')
//var client  = mqtt.connect('mqtt://165.227.26.150')  //para ceapro
//var client  = mqtt.connect('mqtt://18.228.196.66')  //para desimat
var client  = mqtt.connect('mqtt://18.228.220.40'); //remote waters
client.on('connect', () => {
    client.subscribe('desimat/estado')
})
client.on('message', (topic, message) => {

  SubscriberController.filtraMensaje(topic, message);
  
})

