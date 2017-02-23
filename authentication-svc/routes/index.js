'use strict';
var router = require('express').Router();

router.route('/')
  .get(function(req, res, next) {
    res.status(200).json({
      message: 'Welcome to the open endpoint'
    });
  });

router.route('/login')
  .post(function(req, res, next) {
    var jwt = require('jsonwebtoken');
    var payload = { role: 'guest' };
    var secret  = 'secret';
    var options = { expiresIn: '1h' };
    var token = jwt.sign(payload, secret, options);
    res.status(200).json({
      token: token
    });
  });

module.exports = router;
