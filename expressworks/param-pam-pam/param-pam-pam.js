const express = require('express');
const app = express();
const crypto = require('crypto');

app.put('/message/:id', function(req, res) {
	const hash = crypto.createHash('sha1')
			.update(new Date().toDateString() + req.params.id)
			.digest('hex');
	res.send(hash);
});

app.listen(process.argv[2]);
