var express = require('express');
var router = express.Router();
var GoogleStrategy = require('passport-google-oauth2').Strategy
var passport = require('passport');
var knex = require('knex')(require('../../knexfile')[process.env.DB_ENV]);
var globalId;
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.HOST + "/auth/google/callback",
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
      knex('users')
      .where({google_id: profile.id})
      .select('user_id')
      .first()
      .then(function(id){
        globalId = id
        if (id) {
          console.log('welcome back');
        } else {
          return knex('users')
          .insert({user_name: profile.displayName,
                   google_id: profile.id,
                   picture_url: profile.photos[0].value
                 })
          .returning('user_id')
          .then(function(new_user){
            console.log(profile.id);
            console.log(profile.displayName);
            console.log(profile.email);
          })
        }
      })
      return done(null, profile);
    }
));

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Authenticated successfully
    console.log(globalId);
    res.redirect('/admin/'+ globalId.user_id +'/home');
  });

module.exports = router;
