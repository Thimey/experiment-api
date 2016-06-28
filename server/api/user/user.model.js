var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');
var bcrypt = require('bcrypt');

Promise.promisifyAll(mongoose);

var UserSchema = new Schema({
	email: {
		type: String,
		lowercase: true,
		required: true,
		unique: true
	},

	password: {
		type: String,
		required: true
	}
});

UserSchema.pre('save', function (next) {
	this.password = this.encryptPassword(this.password);
	next();
});

// Methods
UserSchema.methods = {
	// Check the password
	authenticate: function (password) {
		return bcrypt.compareSync(plainTextPword, this.password);
	},

	// hash and salt the password
  encryptPassword: function(plainTextPword) {
    if (!plainTextPword) {
      return '';
    } else {
      var salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPword, salt);
    }
  },

  // method to remove password from object for response
  toJson: function() {
    var obj = this.toObject()
    delete obj.password;
    return obj;
  }
}


module.exports = mongoose.model('user', UserSchema);