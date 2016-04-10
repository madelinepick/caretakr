var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
// Eventually put user name and kid's name req param here ==>
router.get('/app/username/kidsname', function(req, res, next) {
  res.render('app');
});

module.exports = router;
