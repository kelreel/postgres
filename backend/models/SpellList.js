'use strict'

const { Model } = require('objection')

class SpellList extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'spell_list'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['heroId', 'spellId'],

      properties: {
        id: { type: 'integer' },
        heroId: { type: ['integer', 'null'] },
        spellId: { type: ['integer', 'null'] },
      },
    }
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    // One way to prevent circular references
    // is to require the model classes here.
    const Hero = require('./Hero')
    const Spell = require('./Spell')

    return {
      hero: {
        relation: Model.HasManyRelation,
        modelClass: Hero,

        join: {
          from: 'spell_list.heroId',
          to: 'hero.id',
        },
      },
      spell: {
        relation: Model.HasManyRelation,
        modelClass: Spell,

        join: {
          from: 'spell_list.spellId',
          to: 'spell.id',
        },
      },
    }
  }
}

module.exports = SpellList
