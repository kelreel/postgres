'use strict'

const { Model } = require('objection')

class Race extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'race'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: ['string', 'null'], maxLength: 255 },
      },
    }
  }

  // This object defines the relations to other models.
  // static get relationMappings() {
  //   // One way to prevent circular references
  //   // is to require the model classes here.
  //   const Person = require('./Person')

  //   return {
  //     owner: {
  //       relation: Model.BelongsToOneRelation,

  //       // The related model. This can be either a Model subclass constructor or an
  //       // absolute file path to a module that exports one.
  //       modelClass: Person,

  //       join: {
  //         from: 'animals.ownerId',
  //         to: 'persons.id',
  //       },
  //     },
  //   }
  // }
}

module.exports = Race
