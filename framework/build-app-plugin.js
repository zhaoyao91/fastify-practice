const loadPluginsPlugin = require('./load-plugins-plugin')
const loadRoutesPlugin = require('./load-routes-plugin')

module.exports = function (options) {
  const {defRoutesDir, implRoutesDir, implPluginsDir, autoMock, orders = {}} = options

  return async function (fastify) {
    if (implPluginsDir) {
      fastify.register(loadPluginsPlugin, {
        dir: implPluginsDir,
        order: orders.plugins
      })
    }

    fastify.register(loadRoutesPlugin, {
      defDir: defRoutesDir,
      implDir: implRoutesDir,
      autoMock: autoMock,
      order: orders.routes
    })
  }
}
