var User = require('./user.model.js');

export.params = function (req, res, next, id) {
	User.findById(id)
		.then(function (err, user) {
			
		})
}


exports.index = function (req, res) {

}


exports.getOne = function (req, res) {
	
}