'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const ExpenseCategory = use('App/Models/ExpenseCategory')

/**
 * Resourceful controller for interacting with expensecategories
 */
class ExpenseCategoryController {
  /**
   * Show a list of all expensecategories.
   * GET expensecategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
    const contacts = await ExpenseCategory.query().fetch()
    return response.json(contacts)
  }

  /**
   * Create/save a new ExpenseCategory.
   * POST expensecategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const name = request.input('name')

    const expenseCategory = new ExpenseCategory()
    expenseCategory.name = name

    await expenseCategory.save()

    return response.json(expenseCategory)
  }

  /**
   * Display a single ExpenseCategory.
   * GET expensecategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const expenseCategory = await ExpenseCategory.findOrFail(params.id)
    return response.json(expenseCategory)
  }

  /**
   * Update ExpenseCategory details.
   * PUT or PATCH expensecategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const name = request.input('name')

    const expenseCategory = await ExpenseCategory.findOrFail(params.id)

    expenseCategory.name = name

    await expenseCategory.save()

    return response.json(expenseCategory)
  }

  /**
   * Delete a ExpenseCategory with id.
   * DELETE expensecategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const expenseCategory = await ExpenseCategory.find(params.id)

    if (expenseCategory) {
      expenseCategory.delete()
      return response.status(204).json()
    }

    return response.status(404).json()
  }
}

module.exports = ExpenseCategoryController
