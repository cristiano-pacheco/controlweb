'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExpenseSchema extends Schema {
  up () {
    this.create('expenses', (table) => {
      table.increments()
      table.integer('expense_category_id').unsigned().notNullable()
      table.string('name').notNullable()
      table.decimal('value').notNullable()
      table.foreign('expense_category_id').references('id').inTable('expense_categories')
      table.timestamps()
    })
  }

  down () {
    this.drop('expenses')
  }
}

module.exports = ExpenseSchema
