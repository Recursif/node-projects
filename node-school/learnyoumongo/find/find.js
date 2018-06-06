const mongo = require('mongodb').MongoClient;
const age = parseInt(process.argv[2]);

const url = 'mongodb://localhost:27017/learnyoumongo';

mongo.connect(url, function(err, db) {
	if (err) throw err
	const parrots = db.collection('parrots');
	
	parrots.find({
		age: {$gt: age}
	}).toArray(function(err, docs) {
		if (err) throw err
		console.log(docs)
		db.close()
	})
})
