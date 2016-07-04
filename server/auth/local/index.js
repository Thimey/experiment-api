var router = require('express').Router();
var auth = require('../auth.service.js');
var passport = require('passport');

router.post('/', function(req, res, next) {
  passport.authenticate('local', 
  	{ session: false },
  	function(err, user, info) {
	    var error = err || info;
	    if (error) {
	      return res.status(401).json(error);
	    }
	    if (!user) {
	    	console.log('no user');
	      return res.status(404).json({message: 'Something went wrong, please try again.'});
	    }
	    
	    // send back token and user
	    res.json({
	    	token: auth.signToken(user._id),
	    	user: user.filter()
	    });
	  })(req, res, next)
});

module.exports = router;