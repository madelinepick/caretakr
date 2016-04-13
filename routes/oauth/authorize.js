var express = require('express');
var knex = require('knex')(require('../../knexfile')['development']);

module.exports = {
  authorizedUser: function(req, res, next) {
    knex('users')
    .where({user_id: req.session.passport.user.id})
    .first()
    .then(function(user){
      console.log(user.user_id);
      if (req.session.passport.user.id) {
        next();
      } else {
        res.redirect('/');
      }
    })
  }
}
