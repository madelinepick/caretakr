exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments('user_id');
    table.string('user_name');
    table.string('email');
    table.string('phone_number');
    table.string('bcrypt_hash');
    table.string('picture_url');
    table.integer('google_id');
    table.integer('dependents_id')


  }).createTable('dependents', function(table){
    table.increments('dependents_id');
    table.string('dependent_name');
    table.string('being-type');
    table.string('picture_url');
    table.integer('rules_id');
    table.integer('contact_info_id')

  }).createTable('rules', function(table){
    table.increments('rules_id');
    table.string('title');
    table.string('body');


  }).createTable('contact_info_id', function(table){
    table.increments('contact_info_id');
    table.string('dependent_friend_number');
    table.string('doctor_number')
  })

};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('users')
  .dropTable('dependents')
  .dropTable('rules')
  .dropTable('contact_info_id')
};
