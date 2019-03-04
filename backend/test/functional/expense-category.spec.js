'use strict'

const { test, trait } = use('Test/Suite')('Expense Category')

const ExpenseCategory = use('App/Models/ExpenseCategory')

trait('Test/ApiClient')

test('get list of expense categories', async ({ client }) => {
  await ExpenseCategory.query().delete();

  await ExpenseCategory.create({
    name: 'Category 1',
  })

  const response = await client.get('/api/expense_categories').end()

  response.assertStatus(200)

  response.assertJSONSubset([
    {
      name: 'Category 1'
    }
  ])
})


test('get one expense category', async ({ client }) => {
  await ExpenseCategory.query().delete();

  const expenseCategory = await ExpenseCategory.create({ name: 'Category 1' })

  const response = await client.get(`/api/expense_categories/${expenseCategory.id}`).end()

  response.assertStatus(200)

  response.assertJSONSubset({ name: 'Category 1' })
})


test('create an expense category', async ({ client }) => {
  await ExpenseCategory.query().delete();

  const response = await client.post('/api/expense_categories').send({name: 'Category 1'}).end()

  response.assertStatus(200)

  response.assertJSONSubset({ name: 'Category 1' })
})


test('update an expense category', async ({ client }) => {
  await ExpenseCategory.query().delete();

  const expenseCategory = await ExpenseCategory.create({
    name: 'Category 1',
  })

  const response = await client.put(`/api/expense_categories/${expenseCategory.id}`).send({name: 'Category 2'}).end()

  response.assertStatus(200)

  response.assertJSONSubset({ name: 'Category 2' })
})


test('delete an expense category', async ({ client }) => {
  await ExpenseCategory.query().delete();

  const expenseCategory = await ExpenseCategory.create({ name: 'Category 1' })

  const response = await client.delete(`/api/expense_categories/${expenseCategory.id}`).end()

  response.assertStatus(204)
})
