'use strict';

var jwt = require('jsonwebtoken');
var createError = require('http-errors');

module.exports = {
  authenticate: function(req, res, next) {
    var encoded = req.headers['authorization'];
    if (!encoded) {
      console.log('No token?');
      next(createError(403, 'No token provided'));
    } else {
      jwt.verify(req.headers['authorization'], 'secret', function(err, decoded) {
        if (err) {
          next(err);
        } else {
          console.log('Decoded token', decoded);
          req.role = decoded.role;
          next();
        }
      });
    }
  }
};
