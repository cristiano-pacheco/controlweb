'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExpenseIncomeSchema extends Schema {
  up () {
    this.create('income_categories', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('income_categories')
  }
}

module.exports = ExpenseIncomeSchema
