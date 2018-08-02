const appRoot = require('app-root-path')
const path = require('path')

module.exports = function (appName, filename) {
  return path.resolve(appRoot.path, 'app', appName, filename)
}
