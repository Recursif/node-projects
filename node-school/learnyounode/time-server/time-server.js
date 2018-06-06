const net = require('net');

const server = net.createServer(function (socket) {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() <= 9
			? '0' + (date.getMonth() + 1)
			: date.getMonth() + 1
	const day = date.getDay() <= 9
			? '0' + (date.getDay() + 1)
			: date.getDay() + 1
	const hours =date.getHours();
	const mins = date.getMinutes();
	const timestamp = `${year}-${month}-${day} ${hours}:${mins}\n`
	socket.end(timestamp);
})

server.listen(process.argv[2])
