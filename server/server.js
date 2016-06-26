var express = require('express');
var app = express();
var api = require('./api');
var config = require('./config');
// var auth = require('./auth');

require('mongoose').connect(config.db.url);

// if (config.seed) {
// 	require('./util/seed');
// }

//app middleware stack
// require('./middleware/appMiddleware')(app);

// mount api routes
app.use('/api', api);
// app.use('/auth', auth);
 app.use(function (req, res) {
 	res.send('blah');
 })




module.exports = app;
