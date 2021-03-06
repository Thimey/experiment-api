var _ = require('lodash');

var config = {
	dev: 'development',
	test: 'testing',
	prod: 'production',
	port: process.env.PORT || 5000,
	jwt: {
		secret: process.env.JWT || 'testSecret',
		expiresInMinutes: 24 * 60 * 60 * 10
	}

}

// default to development environment
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

var envConfig;

try {
	envConfig = require('./' + config.env) || {};
} catch (err) {
	envConfig = {};
}

var merged = _.merge(config, envConfig);

module.exports = merged;
