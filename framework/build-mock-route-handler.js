const faker = require('json-schema-faker')

module.exports = (fastify, api) => async (request, reply) => {
  return faker.resolve(api.schema.response['200'])
}
