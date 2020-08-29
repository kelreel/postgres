exports.up = function (knex) {
  return knex.schema
    .createTable('race', (table) => {
      table.increments('id').primary()

      table.string('name')
      table.string('description')
    })
    .createTable('hero', (table) => {
      table.increments('id').primary()

      table
        .integer('raceId')
        .unsigned()
        .references('id')
        .inTable('race')
        .onDelete('SET NULL')
        .index()

      table.string('name')
      table.string('description')
      table.integer('hp')
      table.integer('mp')
    })
    .createTable('creature', (table) => {
      table.increments('id').primary()

      table
        .integer('raceId')
        .unsigned()
        .references('id')
        .inTable('race')
        .onDelete('SET NULL')
        .index()

      table.string('name')
      table.string('description')
      table.integer('hp')
    })
    .createTable('army', (table) => {
      table.increments('id').primary()

      table
        .integer('heroId')
        .unsigned()
        .references('id')
        .inTable('hero')
        .onDelete('CASCADE')
        .index()

      table
        .integer('creatureId')
        .unsigned()
        .references('id')
        .inTable('creature')
        .onDelete('CASCADE')
        .index()

      table.integer('count')
    })
    .createTable('spell', (table) => {
      table.increments('id').primary()

      table.string('name')
      table.string('description')
      table.integer('mp')
    })
    .createTable('spell_list', (table) => {
      table.increments('id').primary()

      table
        .integer('heroId')
        .unsigned()
        .references('id')
        .inTable('hero')
        .onDelete('CASCADE')
        .index()

      table
        .integer('spellId')
        .unsigned()
        .references('id')
        .inTable('spell')
        .onDelete('CASCADE')
        .index()
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('hero')
    .dropTableIfExists('race')
    .dropTableIfExists('spell')
    .dropTableIfExists('army')
    .dropTableIfExists('spell_list')
    .dropTableIfExists('creature')
}
