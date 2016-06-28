var auth = require('./auth.service');

exports.login = function (req, res, next) {
	res.json({token: auth.signToken(req.user._id)});
};