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
    return knex('rules')
    .where({dependents_id: req.params.dependents_id})
    .then(function(rulesData){
      return knex('dependents')
      .where({dependents_id: req.params.dependents_id})
      .first()
      .then(function(dependent_name_data){
  console.log(dependent_name_data)
      res.render('public', {

        name: dependent_name_data,
        dependents: data,
        rules: rulesData,
        user_id: req.params.user_id
      })
      });
    })
  })
  res.render('public');
})


module.exports = router;
