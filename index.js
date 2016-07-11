var express = require('express');
var app = express();
var http = require('http');
var util = require('util');

// set default env production
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

server = http.createServer(app);

app.set('env', process.env.NODE_ENV);

// Express settings
require('./lib/express')(app);

require('./lib/route')(app);

// Start server
server.listen(80, function() {
  console.info(util.format('Express server listening on port %d in %s mode.', 80));
});

process.on('uncaughtException', function(err) {
  // handle the error safely
  console.error('uncaughtException:', err.stack);
});

// Expose app
module.exports = app;
