var filtered_ls = require('./my-filtered-ls.js');

var folder = process.argv[2];
var ext = process.argv[3];

filtered_ls(folder, ext, print_ls);

function print_ls(err, files) {
	if (err) console.log(err);
	files.forEach(function (file) {
		console.log(file);
	})
}
