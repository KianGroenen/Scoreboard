exports.go = function(server) {
	const Primus = require('primus');
	let primus = new Primus(server, {});

	// your primus logic can go here
	primus.on('connection', function connection(spark) {
		console.log("Primus server connection 🚀");
		primus.library();
		primus.save('../public/javascripts/primuslib.js');

		// send a message to all connected clients
		//primus.write("Hey sparks, here is some data!");

		// do something when we recieve data from a client
		spark.on('data', function(data){
			primus.write(data);
			console.log("Data from spark 🛳");
		});
	});
}