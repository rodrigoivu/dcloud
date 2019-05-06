const PUBLIC_VAPID = 'BFlM7OmepGGDdZP7snr_L0FcFwlj9_24ikRRYUYY5WVxwVT1gpYZhGqPT14iZmXXveWtbfx3TXcGLeOT7sAFc6w';
const PRIVATE_VAPID = 'TFBQy23j-4SJ0RuIwZ4LZ5OrAaFkJFBp9MX-PRlbDvc';
const fakeDatabase = [];
const webpush = require('web-push');
var path = require('path');

webpush.setVapidDetails('mailto:rvaras@ceapro.cl', PUBLIC_VAPID, PRIVATE_VAPID);

function pushSubscribir(req,res){
  const subscription = req.body;
  fakeDatabase.push(subscription);
  res.sendStatus(200);
} 

function pushNotificar(req,res){
	const notificationPayload = {
	    notification: {
	      title: 'New Notification',
	      body: 'This is the body of the notification',
	      icon: 'assets/no-img.jpg'
	    }
	};
  	const promises = [];
  	fakeDatabase.forEach(subscription => {
   	 promises.push(webpush.sendNotification(subscription, JSON.stringify(notificationPayload)));
  	});
  	Promise.all(promises).then(() => res.sendStatus(200));
}

function pushNotificarEvento(title,body){
	var pathNoImage = 'https://d-cloud.desimat.cl/api/get-image-user/5c1bae957fb66a05816d0b35-408.jpg';
	//console.log(pathNoImage);
	const notificationPayload = {
	    notification: {
	      title: title,
	      body: body,
	      icon: pathNoImage
	    }
	};
  	const promises = [];
  	fakeDatabase.forEach(subscription => {
   	 promises.push(webpush.sendNotification(subscription, JSON.stringify(notificationPayload)));
  	});
  	Promise.all(promises).then(() => 
  		console.log('Send Push')
  		);
}

module.exports = {
	pushSubscribir,
	pushNotificar,
	pushNotificarEvento
};