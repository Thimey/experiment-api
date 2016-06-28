var morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var passport = require('passport');

module.exports = function (app) {
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(passport.initialize());
}