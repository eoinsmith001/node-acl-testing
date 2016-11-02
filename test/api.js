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
    tokenGuest  = jwt.sign({username: 'guest@home.com'}, secret, options);
    tokenMember = jwt.sign({username: 'member@home.com'}, secret, options);
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

  it('should ensure that resource endpoints are not reachable by an anonymous user', function(done) {
    agent
    .get('/api/blogs/3')
    .expect(403)
    .end(function(err, response) {
      expect(response.body.message).to.exist;
      done(err);
    });
  });

  it('should allow a member to post a new blog', function(done) {
    agent
    .post('/api/blogs')
    .set('Authorization', tokenMember)
    .send({})
    .expect(201)
    .end(function(err, response) {
      expect(response.body.message).to.exist;
      done(err);
    });
  });

  it('should not allow a guest to post a new blog', function(done) {
    agent
    .post('/api/blogs')
    .set('Authorization', tokenGuest)
    .send({})
    .expect(403)
    .end(function(err, response) {
      expect(response.body.message).to.exist;
      done(err);
    });
  });

  it('should allow a guest to view a blog', function(done) {
    agent
    .get('/api/blogs/4')
    .set('Authorization', tokenGuest)
    .expect(200)
    .end(function(err, response) {
      expect(response.body.content).to.exist;
      done(err);
    });
  });

  it('should not allow a guest to modify a blog', function(done) {
    agent
    .patch('/api/blogs/4')
    .set('Authorization', tokenGuest)
    .send({})
    .expect(403)
    .end(function(err, response) {
      expect(response.body.message).to.exist;
      done(err);
    });
  });

  it('should allow a member to modify a blog', function(done) {
    agent
    .patch('/api/blogs/4')
    .set('Authorization', tokenMember)
    .send({})
    .expect(200)
    .end(function(err, response) {
      expect(response.body.success).to.be.true;
      done(err);
    });
  });
});

