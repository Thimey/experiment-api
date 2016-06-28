var router = require('express').Router();
var controller = require('./auth.controller.js');
var passport = require('passport');

router.post('/', function(req, res, next) {
  passport.authenticate('local', 
  	function(err, user, info) {
	    var error = err || info;
	    if (error) {
	      return res.status(401).json(error);
	    }
	    if (!user) {
	      return res.status(404).json({message: 'Something went wrong, please try again.'});
	    }
	    next();
	  })(req, res, next),
  controller.signup
});

module.exports = router;