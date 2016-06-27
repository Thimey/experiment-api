var morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

console.log('app middleware');

module.exports = function (app) {
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
}