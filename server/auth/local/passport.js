var passport = require('passport');
var localStratergy = require('passport-local');

var User = require('../../api/user/user.model');

passport.use(new localStratergy({
    usernameField: 'email',
    passwordField: 'password'
  },
	function (email, password, done) {
		User.findOneAsync({ email: email.toLowerCase()})
			.then(function (user) {
				if (!user) {
					return done(null, false, { msg: 'email does not exist!'});
				}
				// if user, check password is correct
				if (!user.authenticate(password)) {
					return done(null, false, { msg: 'incorrect password!'});
				} else {
					return done(null, user);
				}
			})
			.catch(function (err) {
				return done(err);
			});
}));

