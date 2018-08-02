const fs = require('fs')
const path = require('path')
const fp = require('fastify-plugin')
const sortByOrder = require('./lib/sort-by-order')
const listModuleNames = require('./lib/list-module-names')

async function loadPluginsPlugin (fastify, options) {
  const {dir, order} = options
  if (!fs.existsSync(dir)) return

  let moduleNames = listModuleNames(dir)
  if (order != null) moduleNames = sortByOrder(moduleNames, order)

  moduleNames
    .map(name => path.resolve(dir, name)) // resolve plugin path
    .map(path => require(path)) // require plugin
    .forEach(plugin => fastify.register(plugin)) // register plugin
}

module.exports = fp(loadPluginsPlugin)
