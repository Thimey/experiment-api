
var _ = require('lodash');
var app = require('../../server');
var request = require('supertest');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var User = require('./user.model.js');

describe('users', function () {
	var userCount;

	before(function (done) {
    var promises = [
       User.remove().exec()
    ];

    Promise.all(promises)
	    .then(function () {
	      done();
	    });
	});

	beforeEach(function (done) {
		User.count({}, function (err, count) {
			userCount = count;
			done();
		});
	});

	describe('creating a user', function () {
		
		it('should create a user on signup', function (done) {
			var user = {
				"email": "test@example.com",
				"password": "password"
			};
			
			request(app)
				.post('/api/user')
				.send(user)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
      	.expect(200)
      	.end(function (err, res) {
      		expect(res.body.user.email).to.equal('test@example.com');
      		expect(res.body.token).to.be.an('string');
      		User.count({}, function (err, count) {
      			expect(count).to.equal(userCount + 1);
      			done();
      		});
      	});

		});

		it('should not delete a user, without authorisation', function (done) {
			var responseUser;
			var user = {
				"email": "test@delete.com",
				"password": "password"
			};

			request(app)
				.post('/api/user')
				.send(user)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
      	.expect(200)
      	.end(function (err, res) {
      		responseUser = res.body.user;
      		request(app)
      			.delete('/api/user/' + responseUser._id)
      			.end(function (err, res) {
      				User.count({}, function (err, count) {
		      			expect(count).to.equal(userCount + 1);
		      			done();
		      		});
      			});
      	});
		});
	});

	describe('edit user', function () {

		it('should not update a user, without authorisation', function (done) {
			var responseUser;
			
			var user = {
				"email": "test@update.com",
				"password": "password"
			};
			var editedUser = {
				"email": "test@editedupdate.com",
				"password": "password"
			}

			request(app)
				.post('/api/user')
				.send(user)
				.set('Accept', 'application/json')
				.expect(200)
				.end(function (err, res) {
					responseUser = res.body.user;
					request(app)
						.put('api/user/' + responseUser._id)
						.send(editedUser)
						.set('Accept', 'application/json')
						.expect('Content-Type', /json/)
						.expect(401)
						.end(function (err, res) {
							done();
						});

				});
		});

		it('should update a user, with authorisation', function (done) {
			var responseUser;
			var token;
			var user = {
				"email": "test@update2.com",
				"password": "password"
			};
			var editedUser = {
				"email": "test@editedupdate2.com",
				"password": "password"
			};

			request(app)
				.post('/api/user')
				.send(user)
				.set('Accept', 'application/json')
				.expect(200)
				.end(function (err, res) {
					responseUser = res.body.user;
					token = res.body.token;
					request(app)
						.put('/api/user/' + responseUser._id)
						.send(editedUser)
						.set('Accept', 'application/json')
						.set('Authorization', 'Bearer ' + token)
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function (err, res) {
							expect(res.body.email).to.be.equal('test@editedupdate2.com');
							done();
						});
				});
		});
	});

	describe('get user(s)', function () {

		it('should get all users', function (done) {
			
			var user1 = new User ({ 
				"email": "test@user1.com",
				"password": "password"
			});
					
			var user2 = new User ({ 
				"email": "test@user2.com",
				"password": "password"
			});

			var user3 = new User ({ 
				"email": "test@user3.com",
				"password": "password"
			});		

			var usersPromises = [
				user1.saveAsync(),
				user2.saveAsync(),
				user3.saveAsync()
			];

			Promise.all(usersPromises)
	    	.then(function () {
	    		request(app)
	    			.get('/api/user')
	    			.set('Accept', 'application/json')
	    			.expect(200)
	    			.end(function (err, res) {
	    				expect(res.body.length).to.be.above(2);
	    				expect(res.body).to.be.an('array');
	    				done();
	    			})
	    	});

		});

		it('should get a particular user', function (done) {
			console.log('Do this when have roles');
			done();
		});
		
		it('should get me, with authorisation', function (done) {
			var responseUser;
			var token;
			var user = {
				"email": "test@me.com",
				"password": "password"
			};

			request(app)
				.post('/api/user')
				.send(user)
				.set('Accept', 'application/json')
				.expect(200)
				.end(function (err, res) {
					responseUser = res.body.user;
					token = res.body.token;
					request(app)
						.get('/api/user/me')
						.set('Accept', 'application/json')
						.set('Authorization', 'Bearer ' + token)
						.expect(200)
						.expect('Content-Type', /json/)
						.end(function (err, res) {
							expect(res.body.email).to.equal('test@me.com')
							done();
						});
				});			
		});
	});	

	
});