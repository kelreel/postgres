'use strict'

const { Model } = require('objection')

class Hero extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'hero'
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
        mp: { type: 'integer' },
        raceId: { type: ['integer', 'null'] },
      },
    }
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    // One way to prevent circular references
    // is to require the model classes here.

    const Creature = require('./Creature')
    const Spell = require('./Spell')

    return {
      race: {
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'hero.raceId',
          to: 'race.id',
        },
      },
      army: {
        relation: Model.ManyToManyRelation,
        modelClass: Creature,
        join: {
          from: 'hero.id',
          through: {
            from: 'army.heroId',
            to: 'army.creatureId',
          },
          to: 'creature.id',
        },
      },
      spell: {
        relation: Model.ManyToManyRelation,
        modelClass: Spell,
        join: {
          from: 'hero.id',
          through: {
            from: 'spell_list.heroId',
            to: 'spell_list.spellId',
          },
          to: 'spell.id',
        },
      },
    }
  }
}

module.exports = Hero
