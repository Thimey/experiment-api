var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = rquire('bluebird');
var bcrypt = require('bcrypt');

Promise.promisifyAll(mongoose);

var UserSchema = new Schema({
	email: {
		type: string,
		required: true,
		unique: true
	},

	password: {
		type: string,
		required: true
	}
});

module.exports = mongoose.model('user', UserSchema);