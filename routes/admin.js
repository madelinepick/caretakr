var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);

router.get('/:user_id/add', function(req, res, next) {
  return knex('dependents')
    .where({
      user_id: req.params.user_id
    })
    .then(function(data) {
      res.render('add', {
        dependents: data,
        user_id: req.params.user_id
      })
    });
});

router.post('/:user_id/add', function(req, res, next) {
  return knex('dependents')
    .insert({
      dependent_name: req.body.dependent_name,
      being_type: req.body.being_type,
      picture_url: req.body.picture_url,
      contact_info_id: req.body.contact_info_id,
      user_id: req.params.user_id
    }).then(function() {
      res.redirect('/admin/' + req.params.user_id + '/home')
    })
})



router.get('/:user_id/update/:dependents_id', function(req, res, next) {
  return knex('dependents')
    .where({
      dependents_id: req.params.dependents_id
    })
    .first()
    .then(function(data) {
      return knex('rules')
        .where({
          dependents_id: req.params.dependents_id
        })
        .first()
        .then(function(more_data) {
          return knex('dependents')
            .where({
              user_id: req.params.user_id
            })
            .then(function(even_more_data) {
              res.render('update', {
                dependent_data: data,
                rules_data: more_data,
                dependents: even_more_data,
                user_id: req.params.user_id
              });
            });
        });
    })
});

router.post('/:user_id/update/:dependents_id', function(req, res, next) {
  return knex('dependents')
    .where({
      dependents_id: req.params.dependents_id
    })
    .update({
      dependent_name: req.body.dependent_name,
      being_type: req.body.being_type,
      picture_url: req.body.picture_url,
      contact_info_id: req.body.contact_info_id,
      user_id: req.params.user_id
    }).then(function() {
      console.log(req.body.dependent_name)
      res.redirect('/admin/' + req.params.user_id + '/home')
    })
});

router.post('/:user_id/delete/:dependents_id', function(req, res, next) {
  return knex('dependents')
    .where({
      dependents_id: req.params.dependents_id
    })
    .del()
    .then(function() {
      res.redirect('/admin/' + req.params.user_id + '/home')
    })
})

router.get('/:user_id/home', function(req, res, next) {
  return knex('dependents')
    .where({
      user_id: req.params.user_id
    })
    .then(function(data) {
      res.render('home', {
        dependents: data,
        user_id: req.params.user_id
      });
    })
});

router.get('/:user_id/contacts', function(req, res, next){
  return knex('dependents')
    .where({
      user_id: req.params.user_id
    })
    .then(function(data) {
      res.render('contact', {
        dependents: data,
        user_id: req.params.user_id
      });
    })})




module.exports = router;
