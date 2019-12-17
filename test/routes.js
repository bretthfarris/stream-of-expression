"use strict";

// This supresses console output from logger
const logger = require('synergy-logger');
logger.transports[2].silent = true

// Import the dependencies for testing
const db = require('../lib/mongodb');
const schema = db.schema;
const chai = require('chai');
const supertest= require('supertest');
const expect = require('chai').expect;
const server = require('../server');
const request = supertest(server);
const random = require('../lib/random');
const dbname = "test_" + random.generateString();

describe("Route Testing", function() {
  //Before starting the tests, create a sandboxed database connection
   //Once a connection is established invoke done()
  before(function (done) {
    db.connect({
      server: process.env.MONGODB_UNITTEST_SERVER,
      database: process.env.MONGODB_UNITTEST_DBNAME,
      username: process.env.MONGODB_UNITTEST_USERNAME,
      password: process.env.MONGODB_UNITTEST_PASSWORD
    }, console.error);
    const connection = db.connection;
    connection.on('error', console.error.bind(console, 'connection error'));
    connection.once('open', function() {
      done();
    });
  });
  describe("User Admin Routes", function() {
    const user = {
      "active": true,
      "firstName": "Testie",
      "lastName": "McTesterson",
      "username": random.generateString(),
      "email": "test" + random.generateString() + "&" + "streamofexpression.com",
      "password": random.generateString()
    };
    describe("POST /a/create-user", function() {
      it('creates a User and returns the userId', function(done){
        request.post('/a/create-user').send(user).end(function(err, res) {
          user.userId = res.body.userId;
          expect(res.status).to.eql(200);
          done(err);
        });
      });
    });
    describe("POST /a/update-user", function() {
      it('updates the previously created User with an _id of ' + user.userId, function(done){
        var params = { "userId": user.userId, "active": false };
        request.post('/a/update-user').send(params).end(function(err, res) {
          expect(res.status).to.eql(200);
          done(err);
        });
      });
    });
    describe("GET /a/get-user", function() {
      it('returns the previously created User based on the _id', function(done){
        request.get('/a/get-user').send({ "_id": user._id }).end(function(err, res) {
          expect(res.body.user._id.length).to.gt(0);
          done(err);
        });
      });
    });
    describe("GET /a/disable-user", function() {
      it('deletes the previously created User', function(done){
        request.get('/a/disable-user').send({ "_id": user._id }).end(function(err, res) {
          expect(res.status).to.eql(200);
          done(err);
        });
      });
    });
  });
  describe("Expression Type Admin Routes", function() {
    const expressionType = {
      "type": random.generateString()
    };
    describe("POST /a/create-expression-type", function() {
      it('creates an Expression Type and returns the type', function(done){
        request.post('/a/create-expression-type').send(expressionType).end(function(err, res) {
          expressionType.expressionTypeId = res.body.expressionTypeId;
          expect(res.status).to.eql(200);
          done(err);
        });
      });
    });
    describe("POST /a/update-expression-type", function() {
      it('updates the previously created Expression Type with an _id of ' + expressionType._id, function(done){
        var params = { "expressionTypeId": expressionType.expressionTypeId, "type": random.generateString() };
        request.post('/a/update-expression-type').send(params).end(function(err, res) {
          expect(res.status).to.eql(200);
          done(err);
        });
      });
    });
    describe("GET /a/get-expression-type", function() {
      it('returns the previously created Expression Type based on the _id', function(done){
        request.get('/a/get-expression-type').send({ "_id": expressionType._id }).end(function(err, res) {
          expect(res.body.expressionType._id.length).to.gt(0);
          done(err);
        });
      });
    });
    describe("GET /a/disable-expression-type", function() {
      it('disables the previously created Expression Type', function(done){
        request.get('/a/disable-expression-type').send({expressionTypeId: expressionType._id}).end(function(err, res) {
          expect(res.status).to.eql(200);
          done(err);
        });
      });
    });
  });
});