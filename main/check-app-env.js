const appRoot = require('app-root-path')

const checkEnv = require('ck-env')

module.exports = function (appName) {
  checkEnv(appRoot.require(`./app/${appName}/env.js`))
}
