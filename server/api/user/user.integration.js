
var app = require('../../server');
var request = require('supertest');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var User = require('./user.model.js');

describe('users', function () {
	var userCount;

	before(function (done) {
    console.log('before');
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
			console.log(count);
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
      		User.count({}, function (err, count) {
      			expect(count).to.equal(userCount + 1);
      			done();
      		});
      	});
		});

		// it('delete a user', function (done) {

		// 	request(app)
		// 		.delete('/api/user')
		// 		.
		// });

	});
	
});