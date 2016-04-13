var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);
var authorized = require('./oauth/authorize')


router.get('/:user_id/add/',  function(req, res, next) {
  authorized.fun(req).then(function(){
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
  }).catch(function() {
    res.redirect('/');
  })
});

router.post('/:user_id/add/', function(req, res, next) {
  authorized.fun(req).then(function(){
  return knex('dependents')
    .insert({
      dependent_name: req.body.dependent_name,
      being_type: req.body.being_type,
      picture_url: req.body.picture_url,
      contact_info_id: req.body.contact_info_id,
      user_id: req.params.user_id,
      title: {
        titles: req.body.title,
        body: req.body.body
      }


    }).then(function() {
      res.redirect('/admin/' + req.params.user_id + '/home')

    })
  }).catch(function() {
    res.redirect('/');
  })
})

router.get('/:user_id/update/:dependents_id', function(req, res, next) {
  authorized.fun(req).then(function(){
    return knex('dependents')
    .where({ dependents_id: req.params.dependents_id })
    .first()
    .then(function(data) {
        return knex('dependents')
        .where({ user_id: req.params.user_id })
        .then(function(even_more_data) {
          console.log(data.title.titles);
          res.render('update', {
            titles: data.title.titles,
            bodies: data.title.body,
            dependent_data: data,
            dependents: even_more_data,
            user_id: req.params.user_id
          });
        });
      });
    }).catch(function() {
      res.redirect('/');
    })
  });

router.post('/:user_id/update/:dependents_id', function(req, res, next) {
  authorized.fun(req).then(function(){
    return knex('dependents')
    .where({ dependents_id: req.params.dependents_id })
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
  }).catch(function() {
    res.redirect('/');
  })
});

router.post('/:user_id/delete/:dependents_id', function(req, res, next) {
  authorized.fun(req).then(function(){
    return knex('dependents')
    .where({ dependents_id: req.params.dependents_id })
    .del()
    .then(function() {
      res.redirect('/admin/' + req.params.user_id + '/home')
    })
  }).catch(function() {
    res.redirect('/');
  })
})

router.get('/:user_id/home', function(req, res, next) {
  authorized.fun(req).then(function(){
    return knex('dependents')
    .where({ user_id: req.params.user_id })
    .then(function(data) {
      res.render('home', {
        dependents: data,
        user_id: req.params.user_id
      });
    })
  }).catch(function() {
    res.redirect('/');
  })
});

router.get('/:user_id/contacts', function(req, res, next) {
  authorized.fun(req).then(function(){
    return knex('dependents')
      .where({ user_id: req.params.user_id })
      .then(function(data) {
        return knex('users')
          .where({ user_id: req.params.user_id })
          .first()
<<<<<<< HEAD
          .then(function(even_more_data){

          console.log(even_more_data);
          res.render('contact', {
            contact_info: even_more_data,
            user: more_data,
            dependents: data,
            user_id: req.params.user_id
=======
          .then(function(more_data) {
            return knex('contact_info')
              .where({ user_id: req.params.user_id })
              .first()
              .then(function(even_more_data){
                console.log(more_data);
                res.render('contact', {
                  contact_info: even_more_data,
                  user: more_data,
                  dependents: data,
                  user_id: req.params.user_id
                })
              })
            })
>>>>>>> 06e339d664b32beebdac1d0976e39c8ab07b7726
          })
        }).catch(function() {
          console.log('error');
          res.redirect('/')
        })
      })


router.post('/:user_id/contacts', function(req, res, next){
  authorized.fun(req).then(function(){
    return knex('users')
    .where({ user_id: req.params.user_id })
    .update({ phone_number: req.body.phone_number })
    .then(function(){
      return knex('contact_info')
        .insert({
          user_id: req.params.user_id,
          dependent_friend_number: req.body.dependent_friend_number,
          doctor_number: req.body.doctor_number,
          vet_number: req.body.vet_number
        })
        .then(function(){
          res.redirect('/admin/' + req.params.user_id + '/home')
        })
      })
    }).catch(function() {
      res.redirect('/');
    })
  })

module.exports = router;
