/*
 * demo.js: static-file node HTTP server for demos.  This demo is *not* secure.
 *
 * Usage: node demo.js [port] [index_file]
 */

var mod_http = require('http');
var mod_url = require('url');
var mod_path = require('path');
var mod_fs = require('fs');

var dd_index = 'index.htm';
var dd_cwd = __dirname;
var dd_port = 8081;
var dd_server;

var i;

if (process.argv.length > 2)
	dd_port = parseInt(process.argv[2], 10);

if (process.argv.length > 3)
	dd_index = process.argv[3];

if (isNaN(dd_port)) {
	console.error('usage: node demo.js [port] [index_file]');
	process.exit(1);
}

mod_http.createServer(function (req, res) {
	var uri = mod_url.parse(req.url).pathname;
	var path;
	var filename;

	path = (uri == '/') ? dd_index : uri;

	/* Not quite correct, but good enough here. */
	if (uri.indexOf('..') != -1) {
		res.writeHead(401);
		res.end();
		return;
	}

	filename = mod_path.join(dd_cwd, path);

	mod_fs.readFile(filename, function (err, file) {
		if (err) {
			res.writeHead(404);
			res.end();
			return;
		}

		res.writeHead(200);
		res.end(file);
	});
}).listen(dd_port, function () {
	console.log('HTTP server started on port ' + dd_port);
});
