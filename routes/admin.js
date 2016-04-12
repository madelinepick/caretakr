var express = require('express'); 
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);

router.get('/:user_id/add', function(req, res, next){
  res.render('add', {user_id: req.params.user_id});
});

router.post('/:user_id/add', function(req, res, next){
  return knex('dependents')
    .insert({
      dependent_name: req.body.name,
      being_type: req.body.being_type,
      picture_url: req.body.picture_url,
      contact_info_id: req.body.contact_info_id,
      user_id: req.params.user_id
    }).then(function() {
      res.redirect('/admin/'+req.params.user_id+'/home')
    })
})



router.get('/:user_id/update/:dependents_id', function(req, res, next){
  return knex('dependents')
  .where({user_id: req.params.user_id})
  .then(function(data){
    console.log(data)
  })
  res.render('update');
});

router.get('/:user_id/home', function(req, res, next){
  res.render('home', {user_id: req.params.user_id});
});



module.exports = router;
