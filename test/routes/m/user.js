"use strict";
// Import the dependencies for testing
const db = require('../../../lib/mongodb');
const schema = db.schema;
const chai = require('chai');
const supertest= require('supertest');
const expect = require('chai').expect;
const server = require('../../../server');
const request = supertest(server);
const random = require('../../../lib/random');
const dbname = "test_" + random.generateString();
const encryption = require('../../../lib/encryption');

describe("/m/user Routes", function() {
  const user = {
    "active": true,
    "firstName": "Testie",
    "lastName": "McTesterson",
    "username": random.generateString(),
    "email": "test" + random.generateString() + "&" + "streamofexpression.com",
    "password": encryption.encrypt(random.generateString())
  };
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()
  before(function (done) {
    db.connect({
      server: process.env.MONGODB_SERVER,
      database: dbname,
      username: process.env.MONGODB_USERNAME,
      password: process.env.MONGODB_PASSWORD
    }, console.error);
    const connection = db.connection;
    connection.on('error', console.error.bind(console, 'connection error'));
    connection.once('open', function() {
      done();
    });
  });
  // Shutdown the server after all tests have been ran
  after(function(done){
    db.connection.db.dropDatabase(function() {
      db.connection.close(function() {
        server.close(done);
      });
    });
  });
  describe("POST /m/user", function() {
    it('creates a User and returns the userId', function(done){
      request.post('/m/user').send(user).end(function(err, res) {
        user.userId = res.body.userId;
        expect(res.body.status).to.eql("ok");
        done(err);
      });
    });
  });
  describe("PUT /m/user", function() {
    it('updates the previously created User with an _id of ' + user.userId, function(done){
      var params = { "userId": user.userId, "active": false };
      request.put('/m/user').send(params).end(function(err, res) {
        expect(res.body.status).to.eql("ok");
        done(err);
      });
    });
  });
  describe("GET /m/user", function() {
    it('returns the previously created User based on the _id', function(done){
      request.get('/m/user').send({ "_id": user._id }).end(function(err, res) {
        expect(res.body.users.length).to.gt(0);
        done(err);
      });
    });
  });
  describe("DELETE /m/user", function() {
    it('deletes the previously created User', function(done){
      request.delete('/m/user').send({ "_id": user._id }).end(function(err, res) {
        expect(res.body.disabled).to.eql(true);
        done(err);
      });
    });
  });
});