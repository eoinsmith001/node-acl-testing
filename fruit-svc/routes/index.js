'use strict';
var router = require('express').Router();
var authenticate = require('./middleware').authenticate;
var acl = require('./acl');

var userId = function(req, res) {
  return req.role;
};

router.route('/')
  .get(function(req, res, next) {
    res.status(200).json({
      message: 'Welcome to the api'
    });
  });

router.use(authenticate);

router.use(function(req, res, next) {
  console.log('Serving authenticated user with role', req.role);
  next();
});

router.route('/blogs')
  .all(acl.middleware(
    2, userId
  ))
  .post(function(req, res, next) {
    res.status(201).json({
      message: 'Created a blog post!'
    });
  })

router.route('/blogs/:id')
  .get(acl.middleware(
    2, userId
  ))
  .get(function(req, res, next) {
    res.status(200).json({
      content: 'lorem ipsum'
    });
  })
  .patch(acl.middleware(
    2, userId, ['modify']
  ))
  .patch(function(req, res, next) {
    res.status(200).json({
      success: true
    });
  });

module.exports = router;
