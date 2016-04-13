
exports.up = function(knex, Promise) {
  return knex.schema.table('contact_info', function(table){
    table.integer('user_id');
    table.dropColumn('dependents_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('contact_info', function(table){
    table.dropColumn('user_id');
    table.integer('dependents_id')
  })
};
