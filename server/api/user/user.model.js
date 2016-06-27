var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');
// var bcrypt = require('bcrypt');

Promise.promisifyAll(mongoose);

var UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},

	password: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('user', UserSchema);