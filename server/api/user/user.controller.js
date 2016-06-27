var User = require('./user.model.js');
var _ = require('lodash');

exports.params = function (req, res, next, id) {
	User.findById(id)
		.select('-password')
		.execAsync()
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

exports.index = function (req, res, next) {
	User.find({})
		.select('-password')
		.execAsync()
		.then(function (users) {
			console.log(users);
			res.json(users);
		})
		.catch(function (err) {
			next(err);
		});
};

exports.getOne = function (req, res) {
	res.send(req.user);
};

exports.create = function (req, res) {
	console.log(req.body)
	var newUser = new User(req.body);

	newUser.saveAsync()
		.then(function (user) {
			res.json(user);
		})
		.catch(function (err) {
			next(err);
		});
};

exports.delete = function (req, res) {
	req.user.removeAsync()
		.then(function (removed) {
			res.send('user removed!');
		})
		.catch(function (err) {
			next(err);
		});
};