'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Income = use('App/Models/Income')

/**
 * Resourceful controller for interacting with incomecategories
 */
class IncomeController {
  /**
   * Show a list of all incomes.
   * GET incomes
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response }) {
    const incomes = await Income.query().paginate()
    return response.json(incomes)
  }

  /**
   * Create/save a new income.
   * POST incomes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const income = new Income()

    income.income_category_id = request.input('income_category_id')
    income.name = request.input('name')
    income.value = parseFloat(request.input('value'))
    income.operation_date = request.input('operation_date')

    await income.save()

    return response.json(income)
  }

  /**
   * Display a single income.
   * GET incomes/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    const income = await Income.findOrFail(params.id)
    return response.json(income)
  }

  /**
   * Update income details.
   * PUT or PATCH incomes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    const income = await Income.findOrFail(params.id)

    income.income_category_id = request.input('income_category_id')
    income.name = request.input('name')
    income.value = parseFloat(request.input('value'))
    income.operation_date = request.input('operation_date')

    await income.save()

    return response.json(income)
  }

  /**
   * Delete a income with id.
   * DELETE incomes/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const income = await Income.find(params.id)

    if (income) {
      income.delete()
      return response.status(204).json()
    }

    return response.status(404).json()
  }
}

module.exports = IncomeController
