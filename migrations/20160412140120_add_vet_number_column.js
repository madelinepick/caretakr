exports.up = function(knex, Promise) {
  return knex.schema.table('contact_info', function(table){
    table.string('vet_number');
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.table('contact_info', function(table){
    table.dropColumn('vet_number')
})

};
