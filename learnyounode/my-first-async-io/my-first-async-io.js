var fs = require('fs');

fs.readFile(process.argv[2], finishedReading);

function finishedReading(error, buf) {
	if (error) return console.log(error)
	var nbLines = buf.toString().split('\n').length -  1;
	console.log(nbLines);
}
