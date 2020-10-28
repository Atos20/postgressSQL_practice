exports.up = function (knex) {
  return knex.schema
    .createTable('action', function (table) {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.boolean('passed').defaultTo(0);
      table.timestamps(true, true);
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('action')
};
