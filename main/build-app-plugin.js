const appRoot = require('app-root-path')

const buildAppPlugin = require('../framework/build-app-plugin')
const getAppConfig = require('./get-app-config')
const existsAppFile = require('./lib/exists-app-file')
const requireAppFile = require('./lib/require-app-file')

module.exports = function (appName) {
  const defRoutesDir = appRoot.resolve('./def/routes')
  const implRoutesDir = appRoot.resolve(`./app/${appName}/routes`)
  const implPluginsDir = appRoot.resolve(`./app/${appName}/plugins`)

  const config = getAppConfig(appName)
  const orders = existsAppFile(appName, 'orders.js') ? requireAppFile(appName, 'orders.js') : {}

  return buildAppPlugin({
    defRoutesDir,
    implRoutesDir,
    implPluginsDir,
    autoMock: config.autoMock,
    orders
  })
}
