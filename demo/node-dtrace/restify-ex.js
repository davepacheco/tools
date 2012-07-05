var server = require('restify').createServer({ name: 'nodeconf' });

server.use(function auth(req, res, next) {
    setTimeout(function () { next(); }, 513);
});

server.get('/:n', function compute(req, res, next) {
    var num = parseInt(req.params.n);
    if (isNaN(num))
        return (next(new restify.ConflictError('"n" must be a number')));
    res.send(doCompute(num) + '\n');
    next();
});

function doCompute(num)
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

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
