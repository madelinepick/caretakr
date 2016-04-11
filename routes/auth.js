var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

router.post('/login', function(req, res, next) {
  console.log(req.body);

  res.redirect('/')
})

router.post('/signup', function(req, res, next) {
  console.log(req.body);
  res.redirect('/')
})

module.exports = router;
