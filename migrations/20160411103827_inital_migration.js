exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments('user_id');
    table.string('user_name');
    table.string('email');
    table.string('phone_number');
    table.string('bcrypt_hash');
    table.string('picture_url');
    table.string('google_id');
    table.integer('dependents_id')


  }).createTable('dependents', function(table){
    table.increments('dependents_id');
    table.string('dependent_name');
    table.string('being_type');
    table.string('picture_url');
    table.integer('contact_info_id');
    table.integer('user_id')

  }).createTable('rules', function(table){
    table.increments('rules_id');
    table.string('title');
    table.string('body');
    table.integer('dependents_id')


  }).createTable('contact_info', function(table){
    table.increments('contact_info_id');
    table.string('dependent_friend_number');
    table.string('doctor_number');
    table.integer('dependents_id')
  })

};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('users')
  .dropTable('dependents')
  .dropTable('rules')
  .dropTable('contact_info')
};
