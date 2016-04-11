
exports.seed = function(knex, Promise) {
  var rules_array = [
    {
      title: "TV Rules",
      body: "No TV after 5pm",
      dependents_id: 1
    },
    {
      title: "Food Allergies",
      body: "Peanuts, meat, carrots",
      dependents_id: 1

    },
    {
      title: "Clothing rules",
      body: "Timmy is not allowed to wear my socks",
      dependents_id: 1
    },
    {
      title: "Sleeping Time",
      body: "Scruffles is not allowed to sleep",
      dependents_id: 2
    },
    {
      title: "Food",
      body: "Feed scruffles 5 Xanax for dinner",
      dependents_id: 2
    },
    {
      title: "Allergies",
      body: "Sally is allergic to salt",
      dependents_id: 3
    },
    {
      title: "Outside playtime rules",
      body: "Sally can play outside until the lamp-post light comes on, usually around 8pm",
      dependents_id: 3
    }
    
  ];

  return Promise.join(
    // Deletes ALL existing entries
    knex('rules').del(),
    knex('rules').insert(rules_array)


  );
};
