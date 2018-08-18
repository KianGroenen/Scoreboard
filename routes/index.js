var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var objectId = require('mongodb').ObjectID;
var assert = require('assert');



/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
// ES6 syntax
/*router.get('/admin', (req, res, next)=>{
	res.render('admin');
});*/

router.get('/admin', function(req, res) {
	var MongoClient = mongodb.MongoClient;

	var url = 'mongodb://kian:abc123@ds125302.mlab.com:25302/scoreapp';

	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log('Unable to connect to the server', err);
		} else {
			console.log('Connection Established');

			var collection = db.db().collection('scores');

			collection.findOne({"_id": objectId("5b784c43a9de926bb9a59f4d")}, function(err, result) {
				if (err) {
					res.send(err);
				} else {
					res.render('admin', {
						'admin' : result
					});
				}

				db.close();
			});
		}
	});
});

router.get('/', function(req, res) {
	var MongoClient = mongodb.MongoClient;

	var url = 'mongodb://kian:abc123@ds125302.mlab.com:25302/scoreapp';

	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log('Unable to connect to the server', err);
		} else {
			console.log('Connection Established');

			var collection = db.db().collection('scores');

			collection.findOne({"_id": objectId("5b784c43a9de926bb9a59f4d")}, function(err, result) {
				console.log(result);
				if (err) {
					res.send(err);
				} else {
					res.render('index', {
						'data' : result
					});
				}

				db.close();
			});
		}
	});
});
/*
router.get('/newscore', function(req, res){
    res.render('newscore', {title: 'Add Score' });
});
 
router.post('/addscore', function(req, res){
 
    // Get a Mongo client to work with the Mongo server
    var MongoClient = mongodb.MongoClient;
 
    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/scoreApp';
 
    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');
 
        // Get the documents collection
        var collection = db.db().collection('scores');
 
        // Get the student data passed from the form
        var match1 = {team1: req.body.team1, team2: req.body.team2,
          score1: req.body.score1, score2: req.body.score2, shots1: req.body.shots1,
          shots2: req.body.shots2, fouls1: req.body.fouls1, fouls2: req.body.fouls2, 
          updates: req.body.updates};
 
        // Insert the student data into the database
        collection.insert([match1], function (err, result){
          if (err) {
            console.log(err);
          } else {
 
            // Redirect to the updated student list
            res.redirect("thelist");
          }
 
          // Close the database
          db.close();
        });
 
      }
    });
 
  });
*/
router.post('/update', function(req, res) {
	var MongoClient = mongodb.MongoClient;

	var url = 'mongodb://kian:abc123@ds125302.mlab.com:25302/scoreapp';

	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log('Unable to connect to the server', err);
		} else {
			console.log('Connection Established');
			var collection = db.db().collection('scores');
			var match1 = {"team1": req.body.team1, "team2": req.body.team2,
          "score1": req.body.score1, "score2": req.body.score2, "shots1": req.body.shots1,
          "shots2": req.body.shots2, "fouls1": req.body.fouls1, "fouls2": req.body.fouls2};

			collection.updateOne({"_id": objectId("5b784c43a9de926bb9a59f4d")}, {$set: match1}, function (err, result) {
				console.log(result);
				if (err) {
		            res.render(err);
		          } else {
		            res.redirect("admin");
		            console.log('Item updated');
		          }

				db.close();

			});
		}
	});
});

router.post('/realtimeUpdates', function(req, res) {
	var MongoClient = mongodb.MongoClient;

	var url = 'mongodb://kian:abc123@ds125302.mlab.com:25302/scoreapp';

	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log('Unable to connect to the server', err);
		} else {
			console.log('Connection Established');
			var collection = db.db().collection('scores');

          	collection.updateOne({"_id": objectId("5b784c43a9de926bb9a59f4d")}, {$push: {updates: req.body.updates}}, function (err, result) {
				if (err) {
		            res.render(err);
		          } else {
		            res.redirect("admin");
		            console.log('Item updated');
		          }

				db.close();

			});
		}
	});
});

module.exports = router;
