const Fastify = require('fastify')

const loggerConfig = require('../framework/logger-config')
const setupGracefulShutdown = require('../framework/setup-graceful-shutdown')
const checkAppEnv = require('./check-app-env')
const getAppConfig = require('./get-app-config')
const buildAppPlugin = require('./build-app-plugin')

const appName = process.argv[2] || 'real'

checkAppEnv(appName)
const appConfig = getAppConfig(appName)
const appPlugin = buildAppPlugin(appName)
const fastify = Fastify({logger: loggerConfig})
fastify.register(appPlugin)

async function boot () {
  try {
    await fastify.listen(appConfig.app.port, '0.0.0.0')
    setupGracefulShutdown(fastify)
    fastify.log.info(`starting ${appName}...`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

boot()
