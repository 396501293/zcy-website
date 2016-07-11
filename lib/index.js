'use strict';

var path = require('path');
var fs = require('fs');
var config = require('./config');
var viewDir = path.join(config.root, config.dir.views);

/**
 * Send our single page app
 */
exports.index = function(req, res) {
  var url = '';
  if (req.url == '/') {
    url = 'index';
  } else {
    url = req.url.substring(1, req.url.length);
  }

  res.render(path.join(viewDir, 'layout'), {
      // users: users,
      title: "EJS example",
      url: url
  });
};
