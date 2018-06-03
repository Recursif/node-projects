const http = require('http');

var url = process.argv[2];

http.get(url, function (res) {
	res.setEncoding('utf8')
	let	nbChar = 0;
	let rawData = '';
	res.on('data', (chunk) => {
			nbChar += chunk.toString().length;
			rawData += chunk.toString();
	});
	res.on('end', () => {
			console.log(nbChar);
			console.log(rawData);
	});
	res.on('error', console.error)
}).on('error', console.error)
