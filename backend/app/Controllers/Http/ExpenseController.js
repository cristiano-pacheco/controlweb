'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Expense = use('App/Models/Expense')

/**
 * Resourceful controller for interacting with expense
 */
class ExpenseController {
  /**
   * Show a list of all expenses.
   * GET expenses
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response }) {
    const expenses = await Expense.query().paginate()
    return response.json(expenses)
  }

  /**
   * Create/save a new expense.
   * POST expenses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const expense = new Expense()

    expense.expense_category_id = request.input('expense_category_id')
    expense.name = request.input('name')
    expense.value = parseFloat(request.input('value'))
    expense.operation_date = request.input('operation_date')

    await expense.save()

    return response.json(expense)
  }

  /**
   * Display a single expense.
   * GET expenses/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    const expense = await Expense.findOrFail(params.id)
    return response.json(expense)
  }

  /**
   * Update expense details.
   * PUT or PATCH expenses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    const expense = await Expense.findOrFail(params.id)

    expense.expense_category_id = request.input('expense_category_id')
    expense.name = request.input('name')
    expense.value = parseFloat(request.input('value'))
    expense.operation_date = request.input('operation_date')

    await expense.save()

    return response.json(expense)
  }

  /**
   * Delete a expense with id.
   * DELETE expenses/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const expense = await Expense.find(params.id)

    if (expense) {
      expense.delete()
      return response.status(204).json()
    }

    return response.status(404).json()
  }
}

module.exports = ExpenseController
