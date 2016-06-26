var config = require('./server/config');
var app = require('./server/server');


app.listen(config.port, function () {
	console.log('listening on http://localhost:' + config.port);
});


