
const LocalStrategy = require('passport-local').Strategy;
const models = require('../models/models');
const User = models.User;
module.exports = function(passport) {
  // Tell Passport how to set req.user
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Tell passport how to read our user models
  passport.use(new LocalStrategy(function(username, password, done) {
    // Find the user with the given username
    User.findOne({
      username: username
    }, function(err, user) {
      // if there's an error, finish trying to authenticate (auth failed)
      if (err) {
        console.log(err);
        return done(err);
      }
      // if no user present, auth failed
      if (!user) {
        console.log(user);
        return done(null, false);
      }
      // if passwords do not match, auth failed
      if (user.password !== password) {
        return done(null, false);
      }
      // auth has has succeeded
      return done(null, user);
    });
  }));
};
