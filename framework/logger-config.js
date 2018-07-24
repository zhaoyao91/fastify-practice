// DO NOT modify this file!

const nanoid = require('nanoid')

module.exports = {
  level: 'info',
  base: null,
  timestamp: false,
  genReqId: (req) => req.headers['x-request-id'] || nanoid()
}
