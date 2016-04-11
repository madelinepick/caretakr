var express = require('express');
var router = express.Router();

router.get('/:user_id/add', function(req, res, next){
  res.render('add');
});

router.get('/:user_id/update', function(req, res, next){
  res.render('update');
});

router.get('/:user_id/home', function(req, res, next){
  res.render('home');
});



module.exports = router;
