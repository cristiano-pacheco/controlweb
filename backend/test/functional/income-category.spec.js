'use strict'

const { test, trait } = use('Test/Suite')('Income Category')

const IncomeCategory = use('App/Models/IncomeCategory')

trait('Test/ApiClient')

test('get list of Income categories', async ({ client }) => {
  await IncomeCategory.query().delete();

  await IncomeCategory.create({
    name: 'Category 1',
  })

  const response = await client.get('/api/income_categories').end()

  response.assertStatus(200)

  response.assertJSONSubset({ data: [{ name: 'Category 1' }] })
})


test('get one Income category', async ({ client }) => {
  await IncomeCategory.query().delete();

  const incomeCategory = await IncomeCategory.create({ name: 'Category 1' })

  const response = await client.get(`/api/income_categories/${incomeCategory.id}`).end()

  response.assertStatus(200)

  response.assertJSONSubset({ name: 'Category 1' })
})


test('create an Income category', async ({ client }) => {
  await IncomeCategory.query().delete();

  const response = await client.post('/api/income_categories').send({name: 'Category 1'}).end()

  response.assertStatus(200)

  response.assertJSONSubset({ name: 'Category 1' })
})


test('update an Income category', async ({ client }) => {
  await IncomeCategory.query().delete();

  const incomeCategory = await IncomeCategory.create({
    name: 'Category 1',
  })

  const response = await client.put(`/api/income_categories/${incomeCategory.id}`).send({name: 'Category 2'}).end()

  response.assertStatus(200)

  response.assertJSONSubset({ name: 'Category 2' })
})


test('delete an Income category', async ({ client }) => {
  await IncomeCategory.query().delete();

  const incomeCategory = await IncomeCategory.create({ name: 'Category 1' })

  const response = await client.delete(`/api/income_categories/${incomeCategory.id}`).end()

  response.assertStatus(204)
})
