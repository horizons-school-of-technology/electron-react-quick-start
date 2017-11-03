const express = require('express');
const app = express();

const server            = require('http').Server(app);
const io                = require('socket.io')(server);

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var auth = require('./routes/auth');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local');
var models = require('./models/models');
var User = models.User;
var mongoose = require('mongoose');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var connect = process.env.MONGODB_URI;
mongoose.connect(connect);

app.use(session({
  secret: 'keyboard cat',
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  // Find the user with the given username
  User.findOne({ username: username }, function (err, user) {
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

app.use(passport.initialize());
app.use(passport.session());

// Uncomment these out after you have implemented passport in step 1
app.use('/', auth(passport));
app.use('/', routes);

io.on('connection', socket => {
  console.log('connected');
  socket.on('change', (text) => {
    socket.broadcast.emit('globalChange', text);
  });
  socket.on('selection', (data) => {
    console.log('selection is:', data);
    socket.broadcast.emit('globalSelection', data);
  });
});


server.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!');
});
