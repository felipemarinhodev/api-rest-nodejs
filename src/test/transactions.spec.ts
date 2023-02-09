import { execSync } from 'child_process'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../app'
describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new transaction', async () => {
    const { createTransactionResponse: response } =
      await createNewTransactionAndReturnCookiesAndTransactionResponse()
    expect(response.statusCode).toEqual(201)
  })
  it('should be able to list all transactions', async () => {
    const { cookies } =
      await createNewTransactionAndReturnCookiesAndTransactionResponse()
    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    ])
  })
  it('should be able to get a specific transactions', async () => {
    const { cookies } =
      await createNewTransactionAndReturnCookiesAndTransactionResponse()
    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    ])
  })
})
async function createNewTransactionAndReturnCookiesAndTransactionResponse() {
  const createTransactionResponse = await request(app.server)
    .post('/transactions')
    .send({
      title: 'New transaction',
      amount: 5000,
      type: 'credit',
    })

  const cookies = createTransactionResponse.get('Set-Cookie')
  return { cookies, createTransactionResponse }
}
