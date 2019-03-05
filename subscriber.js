var SubscriberController = require('./controllers/subscriber');


var mqtt = require('mqtt')
//var client  = mqtt.connect('mqtt://192.168.0.8')
//var client  = mqtt.connect('mqtt://165.227.26.150')  //para ceapro
var client  = mqtt.connect('mqtt://18.228.152.27')  //para desimat
client.on('connect', () => {
    client.subscribe('desimat/estado')
})
client.on('message', (topic, message) => {

  SubscriberController.filtraMensaje(topic, message);
  
})

