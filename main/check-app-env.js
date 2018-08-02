const checkEnv = require('ck-env')
const requireAppFile = require('./lib/require-app-file')

module.exports = function (appName) {
  checkEnv(requireAppFile(appName, 'env.js'))
}
