const requireAppFile = require('./lib/require-app-file')

module.exports = function (appName) {
  return requireAppFile(appName, 'config.js')
}
