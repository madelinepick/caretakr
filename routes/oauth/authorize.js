var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var knex = require('knex')(require('../../knexfile')['development']);

module.exports = {

    fun: function(req) {
      return new Promise(function(resolve,reject){
        return knex('users')
        .where({user_id: req.session.passport.user.id})
        .first()
        .then(function(user){
          if (req.session.passport.user.id == req.params.user_id){
            resolve('True');
          } else {
            reject('False');
          }
        });
      })
    },
    
    loggedIn: function(req, res, next) {
        // console.log(req.session.passport.user.photos);
        if (req.session.passport) {
          next();
        } else {
          res.redirect('/');
        }
      }
  }
