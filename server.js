'use strict';
var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('combined'));
var router = require('./routes');
app.use('/api', router);

// default error handler
app.use(function(err ,req, res, next) {
  console.error(err.message);
  res.status(err.errorCode || err.statusCode || 500).json({
    message: err.message
  });
});
var server = http.createServer(app);
server.listen(port, function() {
  console.log('http', port);
});
