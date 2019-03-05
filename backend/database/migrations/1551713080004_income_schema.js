'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IncomeSchema extends Schema {
  up () {
    this.create('incomes', (table) => {
      table.increments()
      table.integer('income_category_id').unsigned().notNullable()
      table.string('name').notNullable()
      table.decimal('value').notNullable()
      table.date('operation_date').notNullable()
      table.foreign('income_category_id').references('id').inTable('income_categories')
      table.timestamps()
    })
  }

  down () {
    this.drop('incomes')
  }
}

module.exports = IncomeSchema
