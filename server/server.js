var express = require('express');
var app = express();
var api = require('./api');
var config = require('./config');
var auth = require('./auth');
var logger = require('./util/logger');

require('mongoose').connect(config.db.url);

// if (config.env === 'testing') {
// 	require('./seed/testing');
// } else if (config.env === 'development') {
// 	require('./seed/development');
// }

// if (config.seed) {
// 	require('./util/seed');
// }

//app middleware stack
require('./middleware/appMiddleware')(app);

// mount api routes
app.use('/api', api);
app.use('/auth', auth);

app.use(function(err, req, res, next) {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }

  console.log(err);
  // logger.error(err.stack);
  res.status(500).send('something fucked up');
});

module.exports = app;
