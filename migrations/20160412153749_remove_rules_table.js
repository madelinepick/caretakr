
exports.up = function(knex, Promise) {
  return knex.schema.table('dependents', function(table){
    table.json('title');
    table.json('body');
  }).dropTable('rules')
};

exports.down = function(knex, Promise) {
  return knex.schema.table('dependents', function(table){
    table.dropColumn('title');
    table.dropColumn('body');
  }).createTable('rules', function(table){
    table.increments('rules_id');
    table.string('title');
    table.string('body');
    table.integer('dependents_id')
  })
};
