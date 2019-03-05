'use strict'

const { test, trait, beforeEach } = use('Test/Suite')('Expense')

const ExpenseCategory = use('App/Models/ExpenseCategory')
const Expense = use('App/Models/Expense')

trait('Test/ApiClient')

beforeEach(async () => {
  await ExpenseCategory.query().delete();
  await Expense.query().delete();
})

test('get list of Expenses', async ({ client }) => {
  const expenseCategory = await ExpenseCategory.create({
    name: 'Category 1',
  })

  const expense1 = {
    expense_category_id: expenseCategory.id,
    name: 'Expense 1',
    value: 12.10,
    operation_date: '2019/01/01'
  }

  await Expense.create(expense1)

  const expense2 = {
    expense_category_id: expenseCategory.id,
    name: 'Expense 2',
    value: 22.30,
    operation_date: '2019/02/01'
  }

  await Expense.create(expense2)

  const response = await client.get('/api/expenses').end()

  response.assertStatus(200)

  response.assertJSONSubset({ data: [expense1, expense2] })
})


test('get one expense', async ({ client }) => {
  const expenseCategory = await ExpenseCategory.create({
    name: 'Category 1',
  })

  const expense1 = {
    expense_category_id: expenseCategory.id,
    name: 'Expense 1',
    value: 12.10,
    operation_date: '2019/01/01'
  }

  const expense = await Expense.create(expense1)

  const response = await client.get(`/api/expenses/${expense.id}`).end()

  response.assertStatus(200)

  response.assertJSONSubset(expense1)
})


test('create an expense', async ({ client }) => {
  const expenseCategory = await ExpenseCategory.create({
    name: 'Category 1',
  })

  const expense1 = {
    expense_category_id: expenseCategory.id,
    name: 'Expense 1',
    value: 12.10,
    operation_date: '2019/01/01'
  }

  const response = await client.post('/api/expenses').send(expense1).end()

  response.assertStatus(200)

  response.assertJSONSubset(expense1)
})


test('update an expense', async ({ client }) => {
  const expenseCategory = await ExpenseCategory.create({
    name: 'Category 1',
  })

  const expenseCategory2 = await ExpenseCategory.create({
    name: 'Category 2',
  })

  const expense1 = {
    expense_category_id: expenseCategory.id,
    name: 'Expense 1',
    value: 12.10,
    operation_date: '2019/01/01'
  }

  const expense = await Expense.create(expense1)

  const expense2 = {
    expense_category_id: expenseCategory2.id,
    name: 'Expense 2',
    value: 22.30,
    operation_date: '2019/02/01'
  }

  const response = await client.put(`/api/expenses/${expense.id}`).send(expense2).end()

  response.assertStatus(200)

  response.assertJSONSubset(expense2)
})


test('delete an expense', async ({ client }) => {
  const expenseCategory = await ExpenseCategory.create({
    name: 'Category 1',
  })

  const expense1 = {
    expense_category_id: expenseCategory.id,
    name: 'Expense 1',
    value: 12.10,
    operation_date: '2019/01/01'
  }

  const expense = await Expense.create(expense1)

  const response = await client.delete(`/api/expenses/${expense.id}`).end()

  response.assertStatus(204)
})
