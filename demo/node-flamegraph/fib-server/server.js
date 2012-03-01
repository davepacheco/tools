var restify = require('restify');

var server = restify.createServer();
server.get('/:n', respond);
server.head('/:n', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

function respond(req, res, next)
{
	var num = parseInt(req.params.n);
	if (isNaN(num))
		return (next(new restify.ConflictError('"n" must be a number')));
	
	res.send(fib(num) + '\n');
}

function fib(num)
{
	var last1, last2, tmp, i;

	last1 = last2 = 1;

	for (i = 1; i < num; i++) {
		tmp = last1;
		last1 = last2;
		last2 = last1 + tmp;
	}

	return (last2);
}
