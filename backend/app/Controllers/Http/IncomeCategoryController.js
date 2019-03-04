'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const IncomeCategory = use('App/Models/IncomeCategory')

/**
 * Resourceful controller for interacting with incomecategories
 */
class IncomeCategoryController {
  /**
   * Show a list of all incomecategories.
   * GET incomecategories
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response }) {
    const categories = await IncomeCategory.query().paginate()
    return response.json(categories)
  }

  /**
   * Create/save a new incomecategory.
   * POST incomecategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const name = request.input('name')

    const incomeCategory = new IncomeCategory()
    incomeCategory.name = name

    await incomeCategory.save()

    return response.json(incomeCategory)
  }

  /**
   * Display a single incomecategory.
   * GET incomecategories/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    const incomeCategory = await IncomeCategory.findOrFail(params.id)
    return response.json(incomeCategory)
  }

  /**
   * Update incomecategory details.
   * PUT or PATCH incomecategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const name = request.input('name')

    const incomeCategory = await IncomeCategory.findOrFail(params.id)

    incomeCategory.name = name

    await incomeCategory.save()

    return response.json(incomeCategory)
  }

  /**
   * Delete a incomecategory with id.
   * DELETE incomecategories/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const incomeCategory = await IncomeCategory.find(params.id)

    if (incomeCategory) {
      incomeCategory.delete()
      return response.status(204).json()
    }

    return response.status(404).json()
  }
}

module.exports = IncomeCategoryController
