'use strict';
var express = require('express');
var index = require('./index');

/**
 * Application routes
 */
module.exports = function(app) {
  var base = express.Router();

  // 路由前缀
  app.use('/', base);

  // All other routes to use Angular routing in app/scripts/app.js
  // base.all('*', setNoCacheControl, index.partials);
  base.all('/*', index.index);
};
