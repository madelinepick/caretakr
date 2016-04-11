var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport');
var knex = require('knex')(require('../knexfile')['development']);

router.post('/login', function(req, res, next) {
  knex('users')
  .where('user_name', '=', req.body.username.toLowerCase())
  .first()
  .then(function(response){
    if(response && bcrypt.compareSync(req.body.password, response.password)){
      res.redirect('/');
    } else {
      res.render('/');
    }
  });
});

router.post('/signup', function(req, res, next) {
  var hash = bcrypt.hashSync(req.body.password, 8);
  knex('users')
  .insert({'user_name': req.body.username.toLowerCase(), 'bcrypt_hash': hash})
  .then(function(response){
    res.redirect('/');
  })
});

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Authenticated successfully
    res.redirect('/');
  });

module.exports = router;