const path = require('path')
const listModuleNames = require('./lib/list-module-names')
const buildMockRouteHandler = require('./build-mock-route-handler')
const sortByOrder = require('./lib/sort-by-order')

module.exports = async function (fastify, options) {
  const {defDir, implDir, autoMock, order} = options

  let routeNames = listModuleNames(defDir)
  if (order != null) routeNames = sortByOrder(routeNames, order)

  routeNames.forEach(routeName => {
    const api = require(path.resolve(defDir, routeName))

    const handlerPath = path.resolve(implDir, routeName)
    let buildHandler = null

    try {
      buildHandler = require(handlerPath)
    } catch (err) {
      if (err.message.startsWith('Cannot find module')) {
        if (autoMock) {
          buildHandler = buildMockRouteHandler
        } else {
          throw new Error(`route ${routeName} is defined, but no handler is provided`)
        }
      } else {
        throw err
      }
    }

    fastify.register(async (fastify) => {
      fastify.route({
        ...api,
        handler: buildHandler(fastify, api)
      })
    })
  })
}
