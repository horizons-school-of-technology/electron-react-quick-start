var express = require('express');
var router = express.Router();
var models = require('../models/models');
var User = models.User;

module.exports = function(passport) {

  // router.get('/', passport.authenticate('local', {
  //   successRedirect: '/',
  //   failureRedirect: '/login'
  // }));

  router.post('/login', passport.authenticate('local'), function(req, res) {
    res.json({success: true, user: req.user});
  });

  router.post('/register', function(req, res) {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    newUser.save(function(error, user){
      if(error){
        res.json({success: false, error: error});
      } else {
        res.json({success: true});
      }
    });
  });

  // router.get('/login', function(req,res) {
  //   res.send('get request at login');
  // });




  return router;
};
