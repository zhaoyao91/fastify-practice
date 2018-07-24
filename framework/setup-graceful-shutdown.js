module.exports = function (fastify) {
  process.on('SIGTERM', () => {
    fastify.log.info('SIGTERM received, closing server...')
    fastify.close(() => {
      fastify.log.info('server closed, goodbye')
      process.exit(0)
    })
  })
}
