const fs = require('fs')
const path = require('path')

const buildMockRouteHandler = require('./build-mock-route-handler')

module.exports = async function (fastify, options) {
  const {defDir, implDir, autoMock} = options
  const routeNames = fs.readdirSync(defDir).map(name => path.parse(name).name)
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
