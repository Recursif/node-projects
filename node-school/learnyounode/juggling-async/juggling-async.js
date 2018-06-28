const http = require('http');
const async = require('async');
const after = require('after');

var urls = process.argv.slice(2);

var lText = urls.map(x => '');

var print_index = after(urls.length, callback);

async.forEachOf(urls, get);

function get(url, index) {
	http.get(url, function (res) {
		res.setEncoding('utf8');
		var rawData = '';
		res.on('data', (chunk) => {
			rawData += chunk.toString();
		});
		res.on('end', () => {
			lText[index] = rawData;
			print_index(index);
		});
		res.on('error', console.error);
	});
}

function print_index(index) {
	//console.log(index)
}

function callback() {
	lText.forEach(x => console.log(x));
}
