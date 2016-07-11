var path = require('path');
rootPath = path.normalize(__dirname + '/../..');
module.exports = {
  root: rootPath,
  env: 'development',
  dir: {
    statics: '/app',
    views: '/app/views'
  }
}