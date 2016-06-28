var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var config = require('../config');
var User = require('../../user/user.model');

var checkToken = require({ secret: config.jwt.secret });

exports.decodeToken = function (req, res, next) {
	// In case the request does not have token on auth header, add it
	if (req.query && req.query.hasOwnProperty('access_token')) {
    req.headers.authorization = 'Bearer ' + req.query.access_token;
  }

	checkToken(req, res, next);
}

// This is called after the token has been successfuly decoded
// Also need to check that the token is referencing a valid user
// if it is refresh with details, in case they have changed.
exports.getFreshUser = function() {
  return function(req, res, next) {
    User.findByIdAsync(req.user._id)
      .then(function(user) {
        if (!user) {
          res.status(401).send('Unauthorized');
        } else {
          req.user = user;
          next();
        }
      })
      .catch(function(err) {
        next(err);
      });
  }
};

exports.signToken = function (id) {
	var payload = {_id: id};
	var secret = config.jwt.secret;
	var options = {
		expiresInMinutes: config.jwt.expireInMinutes
	}
	return jwt.sign(
		payload,
		secret,
		options
	});
};