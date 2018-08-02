const appRoot = require('app-root-path')

const buildAppPlugin = require('../framework/build-app-plugin')
const getAppConfig = require('./get-app-config')

module.exports = function (appName) {
  const defRoutesDir = appRoot.resolve('./def/routes')
  const implRoutesDir = appRoot.resolve(`./app/${appName}/routes`)
  const implPluginsDir = appRoot.resolve(`./app/${appName}/plugins`)

  const config = getAppConfig(appName)

  return buildAppPlugin({
    defRoutesDir,
    implRoutesDir,
    implPluginsDir,
    autoMock: config.app.autoMock,
    orders: config.app.orders
  })
}
