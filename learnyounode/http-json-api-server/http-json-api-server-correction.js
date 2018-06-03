const http = require('http')
const url = require('url')

function totime(time) {
	return { hour: time.getHours(),
			minute: time.getMinutes(),
			second: time.getSeconds()}
}

function unixtime(time) {
	return {unixtime: time.getTime()}
}

http.createServer(function (req, res) {
	const parsedUrl = url.parse(req.url, true);
	const time = new Date(parsedUrl.query.iso);
	let result;
		
	if (url.parse(req.url).pathname == '/api/parsetime') {
		result = totime(time);
	} else if (parsedUrl.pathname == '/api/unixtime') {
		result = unixtime(time);
	}
	if (result) {
		res.writeHead(200, { 'Content-Type' : 'application/json'})
		res.end(JSON.stringify(result))
	} else {
		res.writeHead(500)
		res.end()
	}
}).listen(process.argv[2])
