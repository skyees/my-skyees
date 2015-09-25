'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Mine = mongoose.model('Mine'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, mine;

/**
 * Mine routes tests
 */
describe('Mine CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Mine
		user.save(function() {
			mine = {
				name: 'Mine Name'
			};

			done();
		});
	});

	it('should be able to save Mine instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mine
				agent.post('/mines')
					.send(mine)
					.expect(200)
					.end(function(mineSaveErr, mineSaveRes) {
						// Handle Mine save error
						if (mineSaveErr) done(mineSaveErr);

						// Get a list of Mines
						agent.get('/mines')
							.end(function(minesGetErr, minesGetRes) {
								// Handle Mine save error
								if (minesGetErr) done(minesGetErr);

								// Get Mines list
								var mines = minesGetRes.body;

								// Set assertions
								(mines[0].user._id).should.equal(userId);
								(mines[0].name).should.match('Mine Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Mine instance if not logged in', function(done) {
		agent.post('/mines')
			.send(mine)
			.expect(401)
			.end(function(mineSaveErr, mineSaveRes) {
				// Call the assertion callback
				done(mineSaveErr);
			});
	});

	it('should not be able to save Mine instance if no name is provided', function(done) {
		// Invalidate name field
		mine.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mine
				agent.post('/mines')
					.send(mine)
					.expect(400)
					.end(function(mineSaveErr, mineSaveRes) {
						// Set message assertion
						(mineSaveRes.body.message).should.match('Please fill Mine name');
						
						// Handle Mine save error
						done(mineSaveErr);
					});
			});
	});

	it('should be able to update Mine instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mine
				agent.post('/mines')
					.send(mine)
					.expect(200)
					.end(function(mineSaveErr, mineSaveRes) {
						// Handle Mine save error
						if (mineSaveErr) done(mineSaveErr);

						// Update Mine name
						mine.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Mine
						agent.put('/mines/' + mineSaveRes.body._id)
							.send(mine)
							.expect(200)
							.end(function(mineUpdateErr, mineUpdateRes) {
								// Handle Mine update error
								if (mineUpdateErr) done(mineUpdateErr);

								// Set assertions
								(mineUpdateRes.body._id).should.equal(mineSaveRes.body._id);
								(mineUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Mines if not signed in', function(done) {
		// Create new Mine model instance
		var mineObj = new Mine(mine);

		// Save the Mine
		mineObj.save(function() {
			// Request Mines
			request(app).get('/mines')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Mine if not signed in', function(done) {
		// Create new Mine model instance
		var mineObj = new Mine(mine);

		// Save the Mine
		mineObj.save(function() {
			request(app).get('/mines/' + mineObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', mine.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Mine instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mine
				agent.post('/mines')
					.send(mine)
					.expect(200)
					.end(function(mineSaveErr, mineSaveRes) {
						// Handle Mine save error
						if (mineSaveErr) done(mineSaveErr);

						// Delete existing Mine
						agent.delete('/mines/' + mineSaveRes.body._id)
							.send(mine)
							.expect(200)
							.end(function(mineDeleteErr, mineDeleteRes) {
								// Handle Mine error error
								if (mineDeleteErr) done(mineDeleteErr);

								// Set assertions
								(mineDeleteRes.body._id).should.equal(mineSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Mine instance if not signed in', function(done) {
		// Set Mine user 
		mine.user = user;

		// Create new Mine model instance
		var mineObj = new Mine(mine);

		// Save the Mine
		mineObj.save(function() {
			// Try deleting Mine
			request(app).delete('/mines/' + mineObj._id)
			.expect(401)
			.end(function(mineDeleteErr, mineDeleteRes) {
				// Set message assertion
				(mineDeleteRes.body.message).should.match('User is not logged in');

				// Handle Mine error error
				done(mineDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Mine.remove().exec();
		done();
	});
});