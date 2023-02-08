import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

const server = fastify()

server.get('/hello', async () => {
  const transaction = await knex('transactions')
    .select('*')
    .where('amount', 1000)
  return transaction
})

server
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
