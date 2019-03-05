'use strict'

const { test, trait, beforeEach } = use('Test/Suite')('Income')

const IncomeCategory = use('App/Models/IncomeCategory')
const Income = use('App/Models/Income')

trait('Test/ApiClient')

beforeEach(async () => {
  await IncomeCategory.query().delete();
  await Income.query().delete();
})

test('get list of Incomes', async ({ client }) => {
  const incomeCategory = await IncomeCategory.create({
    name: 'Category 1',
  })

  const income1 = {
    income_category_id: incomeCategory.id,
    name: 'Income 1',
    value: 12.10,
    operation_date: '2019/01/01'
  }

  await Income.create(income1)

  const income2 = {
    income_category_id: incomeCategory.id,
    name: 'Income 2',
    value: 22.30,
    operation_date: '2019/02/01'
  }

  await Income.create(income2)

  const response = await client.get('/api/incomes').end()

  response.assertStatus(200)

  response.assertJSONSubset({ data: [income1, income2] })
})


test('get one income', async ({ client }) => {
  const incomeCategory = await IncomeCategory.create({
    name: 'Category 1',
  })

  const income1 = {
    income_category_id: incomeCategory.id,
    name: 'Income 1',
    value: 12.10,
    operation_date: '2019/01/01'
  }

  const income = await Income.create(income1)

  const response = await client.get(`/api/incomes/${income.id}`).end()

  response.assertStatus(200)

  response.assertJSONSubset(income1)
})


test('create an income', async ({ client }) => {
  const incomeCategory = await IncomeCategory.create({
    name: 'Category 1',
  })

  const income1 = {
    income_category_id: incomeCategory.id,
    name: 'Income 1',
    value: 12.10,
    operation_date: '2019/01/01'
  }

  const response = await client.post('/api/incomes').send(income1).end()

  response.assertStatus(200)

  response.assertJSONSubset(income1)
})


test('update an income', async ({ client }) => {
  const incomeCategory = await IncomeCategory.create({
    name: 'Category 1',
  })

  const incomeCategory2 = await IncomeCategory.create({
    name: 'Category 2',
  })

  const income1 = {
    income_category_id: incomeCategory.id,
    name: 'Income 1',
    value: 12.10,
    operation_date: '2019/01/01'
  }

  const income = await Income.create(income1)

  const income2 = {
    income_category_id: incomeCategory2.id,
    name: 'Income 2',
    value: 22.30,
    operation_date: '2019/02/01'
  }

  const response = await client.put(`/api/incomes/${income.id}`).send(income2).end()

  response.assertStatus(200)

  response.assertJSONSubset(income2)
})


test('delete an income', async ({ client }) => {
  const incomeCategory = await IncomeCategory.create({
    name: 'Category 1',
  })

  const income1 = {
    income_category_id: incomeCategory.id,
    name: 'Income 1',
    value: 12.10,
    operation_date: '2019/01/01'
  }

  const income = await Income.create(income1)

  const response = await client.delete(`/api/incomes/${income.id}`).end()

  response.assertStatus(204)
})
