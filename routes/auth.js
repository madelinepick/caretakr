var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var knex = require('knex')(require('../knexfile')['development']);


router.post('/login', function(req, res, next) {
  knex('users')
  .where('user_name', '=', req.body.username.toLowerCase())
  .first()
  .then(function(response){
    if(response && bcrypt.compareSync(req.body.password, response.bcrypt_hash)){
      var vpassport = { user: { id: response.user_id} };
      req.session.passport = vpassport
      res.redirect('/admin/'+ response.user_id +'/home');
    } else {
      res.render('/');
    }
  });
});

router.post('/signup', function(req, res, next) {
  var hash = bcrypt.hashSync(req.body.password, 8);
  knex('users')
  .insert({'user_name': req.body.username.toLowerCase(), 'bcrypt_hash': hash, 'picture_url': req.body.picture_url})
  .then(function(response){
    res.redirect('/');
  })
});

router.get('/logout', function(req,res,next){
  req.session = null;
  res.redirect('/');
});
//Get rid of this later or rather GIT rid lol!

module.exports = router;
