import fastify from 'fastify'
import { knex } from './database'

const server = fastify()

server.get('/hello', async () => {
  const transaction = await knex('transactions')
    .select('*')
    .where('amount', 1000)
  return transaction
})

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
