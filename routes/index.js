var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/*Public Route.*/

router.get('/:user_id/public', function(req, res, next){
  // var dataArr = []
  //
  // knex('dependents')
  //   .where()
  // })
  //
  // for (var i = 0; i < ; i++) {
  //   console.log(i);
  // }




  return knex('dependents')
  .where({user_id: req.params.user_id})
  .first()
  .then(function(data) {
    return knex('rules')
    .where({dependents_id: data.dependents_id})
    .then(function(rulesData){
      // console.log(rulesData);
      res.render('public', {
        dependents: data,
        rules: rulesData,
        user_id: req.params.user_id
      });
    })
  })
  res.render('public');
})

module.exports = router;
