'use strict'

const { Model } = require('objection')

class Creature extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'creature'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', maxLength: 255 },
        hp: { type: 'integer' },
        raceId: { type: ['integer', 'null'] },
      },
    }
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    // One way to prevent circular references
    // is to require the model classes here.
    const Race = require('./Race')

    return {
      race: {
        relation: Model.BelongsToOneRelation,

        // The related model. This can be either a Model subclass constructor or an
        // absolute file path to a module that exports one.
        modelClass: Race,

        join: {
          from: 'creature.raceId',
          to: 'race.id',
        },
      },
    }
  }
}

module.exports = Creature
