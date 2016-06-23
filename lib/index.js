'use strict';

var path = require('path');
var fs = require('fs');
var viewDir = path.join(__dirname, '../app/views');

/**
 * Send our single page app
 */
exports.index = function(req, res) {
  console.log("=========req========",req.url);
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
  // res.sendFile(viewDir + '/index.html');
  // var requestedView = path.join(viewDir, req.url);
  // fs.exists(requestedView, function (exists) {
  //   if (exists) {
  //     res.sendFile(requestedView);
  //   } else {
  //     res.sendFile(viewDir + '/index.html');
  //   }
  // });
};
