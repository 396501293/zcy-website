var path = require('path');
rootPath = path.normalize(__dirname + '/../..');
module.exports = {
  root: rootPath,
  env: 'production',
  dir: {
    statics: '/public',
    views: '/views'
  }
}