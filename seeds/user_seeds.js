exports.seed = function(knex, Promise) {
  var users_array = [
    {
      user_name: 'Mama Sue',
      email: 'mamasue@example.com',
      phone_number: '720-366-9042',
      bcrypt_hash: 'exampleha$h',
      picture_url: 'http://images.designntrend.com/data/images/full/26402/mama-june.jpg?w=780',
      google_id: 'example$tring'
    },
    {
      user_name: 'George the Doglover',
      email: 'george@example.com',
      phone_number: '469-569-0924',
      bcrypt_hash: 'exampleha$h2',
      picture_url: 'http://petslady.com/files/images/GW.jpg',
      google_id: 'example$tring2'
    },
    {
      user_name: 'Old Miss Mildred',
      email: 'mildred@example.com',
      phone_number: '(303)-440-9393',
      bcrypt_hash: 'exampleha$h3',
      picture_url: 'http://www.frakerfuneralhome.com/wp-content/uploads/2013/06/bradfordmildred.jpg',
      google_id: 'example$tring3'
    }
  ];

  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),
    knex('users').insert(users_array)


  );
};
