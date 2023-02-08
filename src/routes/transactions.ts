import { FastifyInstance } from 'fastify'
import { knex } from '../database'

export async function transactionsRoutes(server: FastifyInstance) {
  server.get('/hello', async () => {
    const transaction = await knex('transactions')
      .select('*')
      .where('amount', 1000)
    return transaction
  })
}
