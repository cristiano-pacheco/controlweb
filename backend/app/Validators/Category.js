'use strict'

class Category {
  get rules () {
    return {
      name: 'required|max:255|min:3'
    }
  }
}

module.exports = Category
