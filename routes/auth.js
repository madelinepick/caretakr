var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport');


router.post('/login', function(req, res, next) {
  res.redirect('/')
});

router.post('/signup', function(req, res, next) {
  res.redirect('/')
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
