var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var knex = require('knex')(require('../../knexfile')['development']);

module.exports = {

    fun: function(req) {
      console.log('called');
      return new Promise(function(resolve,reject){
        return knex('users')
        .where({user_id: req.session.passport.user.id})
        .first()
        .then(function(user){
          console.log(req.session.passport.user.id);
          console.log(req.params.user_id);
          if (req.session.passport.user.id == req.params.user_id){
            console.log('true');
            resolve('True');
          } else {
            reject('False');
          }
        });
      })
    }
}
