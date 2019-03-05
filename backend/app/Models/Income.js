'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Income extends Model {
  category () {
    return this.belongsTo('App/Models/ExpenseCategory')
  }
}

module.exports = Income
