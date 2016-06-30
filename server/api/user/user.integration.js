
var app = require('../../server');
var request = require('supertest');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var User = require('./user.model.js');

describe('users', function () {

	before(function (done) {
		// mongoose.connection.db.dropDatabase(function () {
		// 	console.log('dropping db');
		// 	done();
		// });
		function clearDB() {
	    var promises = [
	        User.remove().exec(),
	    ];

	    Promise.all(promises)
	        .then(function () {
	            done();
	        })
    }

    clearDB();
	});

	describe('creating a user', function () {
		
		it('should create a user on signup', function (done) {
			var user = {
				"email": "test@example4.com",
				"password": "password"
			};
			
			request(app)
				.post('/api/user')
				.send(user)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
      	.expect(200)
      	.end(function (err, res) {
      		expect(res.body.user.email).to.equal('test@example4.com');
      		done();
      	});
		});

	});
	
});