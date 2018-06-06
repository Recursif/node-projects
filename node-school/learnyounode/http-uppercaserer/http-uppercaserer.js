const http = require('http')
const map = require('through2-map')

const server = http.createServer(function (req, res) {
	if (req.method !== 'POST') {
		return res.end("Send a POST Please\n");	
	}
	req.pipe(map((chunk) => {
		return chunk.toString().toUpperCase();
	})).pipe(res)
}).listen(process.argv[2])
