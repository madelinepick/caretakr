
exports.seed = function(knex, Promise) {
  var dependents_array = [
    {
      dependent_name: "Little Timmy",
      being_type: "Child",
      picture_url: "http://thehilljean.com/wp-content/uploads/2014/05/Tico-and-Tina-Haircut-.jpg",
      contact_info_id: 1,
      user_id: 1
    },
    {
      dependent_name: "Scruffles",
      being_type: "Dog",
      picture_url: "http://7-themes.com/data_images/out/50/6941994-little-dog.jpg",
      contact_info_id: 2,
      user_id: 2
    },
    {
      dependent_name: "Sally Sue",
      being_type: "Child",
      picture_url: "http://orig06.deviantart.net/702e/f/2014/140/4/a/little_girl_with_chicken_3_by_anastasiya_landa-d7j2gij.jpg",
      contact_info_id: 3,
      user_id: 3
    }
  ];

  return Promise.join(
    // Deletes ALL existing entries
    knex('dependents').del(),
    knex('dependents').insert(dependents_array)


  );
};
