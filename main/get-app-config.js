const appRoot = require('app-root-path')

module.exports = function (appName) {
  return appRoot.require(`./app/${appName}/config.js`)
}
