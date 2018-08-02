const fs = require('fs')
const getAppFilePath = require('./get-app-file-path')

module.exports = function (appName, filename) {
  const filepath = getAppFilePath(appName, filename)
  return require(filepath)
}
