'use strict';
var expect = require('chai').expect;
var request = require('supertest');
var jwt = require('jsonwebtoken');

describe('api', function() {
  var url = 'http://localhost:3001';
  var agent = request(url);
  var tokenGuest;
  var tokenMember;
  
  before(function(done) {
    var options = { expiresIn: '1m' };
    var secret = 'secret';
    tokenGuest  = jwt.sign({username: 'guest@home.com', group:'guest'}, secret, options);
    tokenMember = jwt.sign({username: 'member@home.com', group:'member'}, secret, options);
    // console.log('guest', tokenGuest);
    // console.log('member', tokenMember);
    done();
  });

  it('has an endpoint which is reachable by an anonymous user', function(done) {
    agent
    .get('/api')
    .expect(200)
    .end(function(err, response) {
      expect(response.body.message).to.exist;
      done(err);
    });
  });

  it('has an endpoint which is reachable only by an authorized user', function(done) {
    agent
    .get('/api/protected')
    .expect(403)
    .end(function(err, response) {
      expect(response.body.message).to.exist;
      done(err);
    });
  });

});

