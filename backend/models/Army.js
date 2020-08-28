'use strict'

const { Model } = require('objection')

class Army extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'army'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        heroId: { type: ['integer', 'null'] },
        creatureId: { type: ['integer', 'null'] },
        count: { type: 'integer' },
      },
    }
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    // One way to prevent circular references
    // is to require the model classes here.
    const Hero = require('./Hero')
    const Creature = require('./Creature')

    return {
      hero: {
        relation: Model.HasManyRelation,
        modelClass: Hero,

        join: {
          from: 'army.heroId',
          to: 'hero.id',
        },
      },
      creature: {
        relation: Model.HasManyRelation,
        modelClass: Creature,

        join: {
          from: 'army.creatureId',
          to: 'creature.id',
        },
      },
    }
  }
}

module.exports = Army
