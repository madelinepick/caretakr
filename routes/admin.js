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
      return knex('users')
      .where({user_id: req.params.user_id})
      .first()
      .then(function(user_data){

      res.render('add', {
        user: user_data,
        dependents: data,
        user_id: req.params.user_id
      })
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
          return  knex('users')
          .where({user_id: req.params.user_id})
          .first()
          .then(function(user_data){
          res.render('update', {
            user: user_data,
            title1: data.title.titles[0],
            body1: data.title.body[0],
            dependent_data: data,
            dependents: even_more_data,
            user_id: req.params.user_id
          })
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
    .del()
    .then(function(){
      return knex('dependents')
      .insert({
        dependent_name: req.body.dependent_name,
        being_type: req.body.being_type,
        picture_url: req.body.picture_url,
        contact_info_id: req.body.contact_info_id,
        user_id: req.params.user_id,
        title: {
          titles: req.body.section1name,
          body: req.body.section1
        }
      })
      .then(function() {
        res.redirect('/admin/' + req.params.user_id + '/home')
      })
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
      return knex('users')
      .where({user_id: req.params.user_id})
      .first()
      .then(function(user_data){
        return knex('contact_info')
        .where({user_id: req.params.user_id})
        .first()
        .then(function(contact_info_data){
      res.render('home', {
        contact_info: contact_info_data,
        user: user_data,
        user_name: user_data.user_name.substring(0, user_data.user_name.indexOf("@")),
        dependents: data,
        user_id: req.params.user_id
      })
      })
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
          .then(function(more_data) {
            return knex('contact_info')
              .where({ user_id: req.params.user_id })
              .first()
              .then(function(even_more_data){
                res.render('contact', {
                  contact_info: even_more_data,
                  user: more_data,
                  dependents: data,
                  user_id: req.params.user_id
                })
              })
            })
          })
        }).catch(function() {
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

  router.get('/:user_id/dependents/:dependents_id', function(req, res, next){
    authorized.fun(req).then(function(){
    return knex('dependents')
    .where({user_id: req.params.user_id})
    .then(function(data) {
      return knex('dependents')
      .where({dependents_id: req.params.dependents_id})
      .first()
      .then(function(rules_data){
        return knex('contact_info')
        .where({user_id: req.params.user_id})
        .first()
        .then(function(contact_info_data){
          return knex('users')
          .where({user_id: req.params.user_id})
          .first()
          .then(function(user_data){
        res.render('dependents', {
          contact_info: contact_info_data,
          user: user_data,
          dependents: data,
          rules: rules_data,
          title1: rules_data.title.titles[0],
          title2: rules_data.title.titles[1],
          title3: rules_data.title.titles[2],
          title4: rules_data.title.titles[3],

          body1: rules_data.title.body[0],
          body2: rules_data.title.body[1],
          body3: rules_data.title.body[2],
          body4: rules_data.title.body[3],

          user_id: req.params.user_id
        })
        })
        })
      })
    });
  }).catch(function() {
    res.redirect('/');
  })
})

  router.get('/:user_id/settings', function(req, res, next){
    authorized.fun(req).then(function(){
    return knex('users')
    .where({user_id: req.params.user_id})
    .first()
    .then(function(user_data){
      return knex('dependents')
      .where({user_id: req.params.user_id})
      .then(function(dependent_data){
      res.render('settings', {
        user: user_data,
        dependents: dependent_data,
        user_id: req.params.user_id
      })
      })
    })
  }).catch(function() {
    res.redirect('/');
  })
})

  router.post('/:user_id/settings', function(req, res, next){
    authorized.fun(req).then(function(){
    return knex('users')
    .where({user_id: req.params.user_id})
    .first()
    .update({picture_url: req.body.picture_url})
    .then(function(){
      res.redirect('/admin/' + req.params.user_id + '/home')
    })
  }).catch(function() {
    res.redirect('/');
  })
})

module.exports = router;
