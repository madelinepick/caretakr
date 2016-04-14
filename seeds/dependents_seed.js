
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('dependents').del(),

    // Inserts seed entries
    knex('dependents').insert({dependent_name:'Wittle Baby', being_type:'baby', picture_url:'http://www.myhousecallmd.com/wp-content/uploads/2010/12/One-Happy-Baby.jpg', contact_info_id:'1', user_id:'1', title: {
      titles: ['Bedtime Rules', 'Allergies'],
      body: ['Sleep before 8pm', 'Shellfish, Peanut Butter']
    }}),
    knex('dependents').insert({dependent_name:'Scruffles', being_type:'dog', picture_url:'http://ghk.h-cdn.co/assets/16/09/980x490/landscape-1457107485-gettyimages-512366437.jpg', contact_info_id:'1', user_id:'1', title: {
      titles: ['Food', ''],
      body: ['Feed twice a day', '']
    }})
  );
};
