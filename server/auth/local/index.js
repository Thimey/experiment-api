var router = require('express').Router();
var controller = require('./auth.controller.js');
var passport = require('passport');

router.post('/',
	passport.authenticate('local', { 
		successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    session: false
  }),
  controller.signup
);


module.exports = router;