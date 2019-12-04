"use strict";
const db = require('../../lib/mongodb.js');
const expressionModel = require('../../models/expression.js');
const random = require('../../lib/random.js');
const encryption = require('../../lib/encryption.js');
const expect = require('chai').expect;

// Import the environment configuration values
const dotenv = require('dotenv');
dotenv.config();

var title = random.generateString();

describe('Expression Model', function() {
  before(function (done) {
    db.connect({
      server: process.env.MONGODB_SERVER,
      database: "test",
      username: process.env.MONGODB_USERNAME,
      password: process.env.MONGODB_PASSWORD
    }, console.error);
    const connection = db.connection;
    connection.on('error', console.error.bind(console, 'connection error'));
    connection.once('open', function() {
      done();
    });
  });
  
  //After all tests are finished drop database and close connection
  after(function(done){
    db.connection.db.dropDatabase(function() {
      db.connection.close(done);
    });
  });
  
  it('New expression saved to test database', function(done) {
    var testExpression = expressionModel({
      title: title
    });

    testExpression.save(done);
  });
  it('Dont save incorrect format to database', function(done) {
    //Attempt to save with wrong info. An error should trigger
    var wrongSave = expressionModel({
      notTitle: 'Not Testie McTesterson'
    });
    wrongSave.save(err => {
      if(err) { return done(); }
      throw new Error('Should generate error!');
    });
  });
  it('Should retrieve data from test database', function(done) {
    //Look up the user object previously saved.
    expressionModel.find({title: title}, (err, _title) => {
      if(err) {throw err;}
      if(_title.length === 0) {throw new Error('No data!');}
      done();
    });
  });
});