var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/*Public Route.*/
router.get('/:user_id/public/:dependents_id', function(req, res, next){
  return knex('dependents')
  .where({user_id: req.params.user_id})
  .then(function(data) {
    return knex('dependents')
    .where({dependents_id: req.params.dependents_id})
    .first()
    .then(function(rules_data){

      res.render('public', {
        dependents: data,
        rules: rules_data,
        user_id: req.params.user_id
      })
    })
  });
})



module.exports = router;
