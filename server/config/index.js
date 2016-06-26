var _ = require('lodash');

var config = {
	dev: 'developent',
	test: 'testing',
	prod: 'production',
	port: process.env.PORT || 3000
}

// default to development environment
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

var envConfig;

try {
	envConfig = require(`./${config.env}`) || {};
} catch (err) {
	envConfig = {};
}

module.exports = _.merge(config, envConfig);
