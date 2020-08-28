'use strict'

const { Model } = require('objection')

class Spell extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'spell'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: ['string', 'null'], maxLength: 255 },
        hp: { type: 'integer' },
      },
    }
  }
}

module.exports = Spell
