const fs =  require('fs');
const express = require('express');
const app = express();

app.get('/books', function(req, res) {
	fs.readFile(process.argv[3], (err, data) => {
		if (err) res.sendStatus(500);
		try {
			const books = JSON.parse(data);
		} catch(e) {
			res.sendStatus(500);
		}
		res.json(books);
	})
})

app.listen(process.argv[2])
