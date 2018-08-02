const path = require('path')
const fs = require('fs')

function listModuleNames (dir) {
  return fs.readdirSync(dir).map(name => path.parse(name).name)
}

module.exports = listModuleNames
