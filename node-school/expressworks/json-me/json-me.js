const fs = require('fs');
const express = require('express');
const app = express();

app.get('/books', function(req, res, next) {
	fs.readFile(process.argv[3], (err, data) => {
		if (err) throw err;
		res.json(JSON.parse(data));
	});
})

app.listen(process.argv[2])
