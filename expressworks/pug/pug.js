const express = require('express');
const app = express();

app.set('views', process.argv[3]);
app.set('view engine', 'pug');
app.get('/home', function(req, res) {	
	res.render('index', {date: new Date().toDateString()});
}).listen(process.argv[2])

