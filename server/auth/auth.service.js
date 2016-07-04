var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var config = require('../config');
var User = require('../api/user/user.model');

var checkToken = expressJwt({ secret: config.jwt.secret });

exports.isAuthenticated = function (req, res, next) {
	return compose()
		.use(decodeToken())
		.use(getUser());
};

exports.signToken = function (id) {
	var payload = {_id: id};
	var secret = config.jwt.secret;
	var options = {
		expiresIn: config.jwt.expireInMinutes
	};
	return jwt.sign(
		payload,
		secret,
		options
	);
};

exports.decodeToken = function (req, res, next) {
	// // In case the request does not have token on auth header, add it
	// if (req.query && req.query.hasOwnProperty('access_token')) {
 //    req.headers.authorization = 'Bearer ' + req.query.access_token;
 //  }
 
	return function (req, res, next) {
		checkToken(req, res, next);
	};
}

// This is called after the token has been successfuly decoded
// Also need to check that the token is referencing a valid user
// if it is refresh with details, in case they have changed.
exports.getUser = function () {
  return function (req, res, next) {
    User.findByIdAsync(req.user._id)
      .then(function(user) {
        if (!user) {
          res.status(401).send('Unauthorized');
        } else {
          req.user = user;
          next();
        }
      })
      .catch(function (err) {
        next(err);
      });
  }
}