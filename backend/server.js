const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
// const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const models = require('./models/models');
const User = models.User;

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

mongoose.connection.on('connected', () => {
  console.log('Successfully connected to MongoDB! =)');
});

mongoose.connect(process.env.MONGODB_URI);                // Connect to our DB!

// BEGIN PASSPORT HERE -------------------------------------------------
const session = require('express-session');
app.use(session({
  secret: 'keyboard cat'
}));
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

// poassport middleware
app.use(passport.initialize());
app.use(passport.session());

// END PASSPORT HERE --------------------------------------------------------

app.get('/login', (req, res) => {
  res.send('Hello World!');
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/users' , // TODO change the redirect link
    failureRedirect: '/login',
    failureFlash: "dumbass, your login shit is wrong",
    successFlash: "Welcome Bitch"
  }));

app.post('/register', (req, res) => {
  res.semd("hello its working");
});

// Error handler/Catch 404 ---------------------------------------------------
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// ---------------------------------------------------------------------------

app.listen(3000, () => {
  console.log('Backend server for Electron Docs App running on port 3000!');
});
