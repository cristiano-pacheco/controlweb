'use strict'

class Expense {
  get rules () {
    return {
      expense_category_id: 'required|integer',
      name: 'required|max:255|min:3',
      value: 'required|number',
      operation_date: 'required|date'
    }
  }
}

module.exports = Expense
