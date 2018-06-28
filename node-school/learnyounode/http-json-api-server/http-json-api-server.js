const http = require('http')
const url = require('url')

const server = http.createServer(function (req, res) {
	let result;	
	if (url.parse(req.url).pathname == '/api/parsetime') {
		const date = new Date(url.parse(req.url).query.slice(4));
		result = JSON.stringify({
			hour: date.getHours(),
			minute: date.getMinutes(),
			second: date.getSeconds()
		})
	}
	if (url.parse(req.url).pathname == '/api/unixtime') {
		const date = url.parse(req.url).query.slice(4);
		const unixtime = new Date(date).getTime();
		result = JSON.stringify({unixtime: unixtime})
	}
	if (result) {
		res.writeHead(200, { 'Content-Type': 'application/json'})
		res.end(result)
	} else {
		res.writeHead(500)
		res.end("Provide a right link\n")
	}
}).listen(process.argv[2])
