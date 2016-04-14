var express = require('express');
var passport = require('passport');
var knex = require('knex')(require('../../knexfile')[process.env.DB_ENV]);

passport.serializeUser(function(user, done) {
  knex('users')
  .where({google_id: user.id})
  .first()
  .then(function(user){
    user.userinfo = {id: user.user_id};
    done(null, user.userinfo);
  })
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
