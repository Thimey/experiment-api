var User = require('./user.model.js');

export.params = function (req, res, next, id) {
	User.findByIdAsync(id)
		.then(function (user) {
			if(!user) { 
				next( new Error('Could not find user with that id'));
			} else {
				req.user = user;
				next()
			}
		})
		.catch(function (err) {
			next(err);
		});
};


exports.index = function (req, res) {

};


exports.getOne = function (req, res) {
	res.send(req.user);
};

exports.create = function (req, res) {
	var newUser = new User(req.body);

	newUser.saveAsync()
		.then(function (user) {
			res.json(user);
		})
		.catch(function (err) {
			console.log(err);
		});
};