
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({user_name:'fabio', email: 'fabs@fabio.com', phone_number: '111-111-1111', bcrypt_hash: '$2a$10$iAhnxXPpg6L82A9oiuIHHe.vOpaWSUc3IFGjhvysUBUzJqjs4gh6O', picture_url:'https://pbs.twimg.com/profile_images/269279233/llama270977_smiling_llama_400x400.jpg'})
  );
};
