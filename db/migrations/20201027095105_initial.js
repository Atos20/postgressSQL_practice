
exports.up = function(knex) {
  return knex.schema.createTable('todo', function(table){     
    table.increments()
    table.string ('name').notNullable();
    table.text('content').notNullable();
    table.boolean('done').defaultTo(0)
    table.timestamps(true, true);
})

};

exports.down = function(knex) {
    return knex.schema.dropTable('todo')                                                                                          
};                                                         

