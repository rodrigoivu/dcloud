const PUBLIC_VAPID = 'BFlM7OmepGGDdZP7snr_L0FcFwlj9_24ikRRYUYY5WVxwVT1gpYZhGqPT14iZmXXveWtbfx3TXcGLeOT7sAFc6w';
const PRIVATE_VAPID = 'TFBQy23j-4SJ0RuIwZ4LZ5OrAaFkJFBp9MX-PRlbDvc';
const fakeDatabase = [];
const webpush = require('web-push');

webpush.setVapidDetails('mailto:rvaras@ceapro.cl', PUBLIC_VAPID, PRIVATE_VAPID);

function pushSubscribir(req,res){
  const subscription = req.body;
  fakeDatabase.push(subscription);
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

module.exports = {
	pushSubscribir,
	pushNotificar,
};