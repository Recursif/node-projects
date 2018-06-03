var fs = require('fs');
var path = require('path');

var ext = '.' + process.argv[3];
var folder = process.argv[2];

fs.readdir(folder, finishedReading);

function finishedReading(error, files) {
	if (error) return console.log(error)
	files.forEach (function (file) {
		if (path.extname(file) == ext) {
			console.log(file);
		}
	})
}
