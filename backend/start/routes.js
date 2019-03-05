'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})


// Income Categories
Route.get('/api/income_categories', 'IncomeCategoryController.index')
Route.get('/api/income_categories/:id', 'IncomeCategoryController.show')
Route.put('/api/income_categories/:id', 'IncomeCategoryController.update').validator('Category')
Route.post('/api/income_categories', 'IncomeCategoryController.store').validator('Category')
Route.delete('/api/income_categories/:id', 'IncomeCategoryController.destroy')


// Expense Categories
Route.get('/api/expense_categories', 'ExpenseCategoryController.index')
Route.get('/api/expense_categories/:id', 'ExpenseCategoryController.show')
Route.put('/api/expense_categories/:id', 'ExpenseCategoryController.update').validator('Category')
Route.post('/api/expense_categories', 'ExpenseCategoryController.store').validator('Category')
Route.delete('/api/expense_categories/:id', 'ExpenseCategoryController.destroy')


// Incomes
Route.get('/api/incomes', 'IncomeController.index')
Route.get('/api/incomes/:id', 'IncomeController.show')
Route.put('/api/incomes/:id', 'IncomeController.update').validator('Income')
Route.post('/api/incomes', 'IncomeController.store').validator('Income')
Route.delete('/api/incomes/:id', 'IncomeController.destroy')
