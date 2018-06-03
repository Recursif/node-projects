const mongo = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017/learnyoumongo'

const firstName = process.argv[2]
const lastName = process.argv[3]

const doc = {
	firstName : firstName,
	lastName : lastName
}


mongo.connect(url, function(err, db) {
	if (err) console.log(err)
	
	const docs = db.collection('docs');

	docs.insert(doc, function(err, data) {
		if (err) console.log(err)
		console.log(JSON.stringify(doc))
		db.close()
	})
})

