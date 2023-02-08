import fastify from 'fastify'

const server = fastify()

server.get('/hello', () => {
  return 'Hello NodeJS'
})

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
