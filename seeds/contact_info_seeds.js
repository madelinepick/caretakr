
exports.seed = function(knex, Promise) {
  var contact_info_array = [
    {
      dependent_friend_number: "303-954-8402",
      doctor_number: "(303)945-4074",
      dependents_id: 1
    },
    {
      dependent_friend_number: "303-442-0892",
      doctor_number: "(720)476-6186",
      dependents_id: 2
    },
    {
      dependent_friend_number: "(303)539-6525",
      doctor_number: "(303)440-1323",
      dependents_id: 3
    }
  ];

  return Promise.join(
    // Deletes ALL existing entries
    knex('contact_info').del(),
    knex('contact_info').insert(contact_info_array)


  );
};
