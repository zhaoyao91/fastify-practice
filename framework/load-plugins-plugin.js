const fs = require('fs')
const path = require('path')
const fp = require('fastify-plugin')

async function loadPluginsPlugin (fastify, options) {
  const {dir} = options
  if (!fs.existsSync(dir)) return
  const plugins = listPlugins(dir)
  plugins.forEach(plugin => fastify.register(plugin))
}

function listPlugins (dir) {
  const names = fs.readdirSync(dir)
  const paths = names.map(name => path.resolve(dir, name))
  return paths.map(path => require(path))
}

module.exports = fp(loadPluginsPlugin)
