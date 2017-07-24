const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
// const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

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

require('./routes/auth')(passport);

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
