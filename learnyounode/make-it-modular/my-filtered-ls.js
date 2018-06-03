var fs = require('fs');
var path = require('path');

module.exports = function filtered_ls(folder, ext, callback) {
	fs.readdir(folder, function finishedReading(err, files) {  
		if (err) return callback(err)
		
		data = [];	
		files.forEach (function (file) {
			if (path.extname(file) == '.' + ext) {
				data.push(file);
			}
		})
		callback(null, data)
	})
}
