const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('../webpack.config.js')
// const indexFile = require('../build/index.dev.html')


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);


const User = require('./models').User;
const Doc = require('./models').Doc;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.json());

app.use(session({
    secret: 'super saiyan',
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

/* PASSPORT SETUP */
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());
//End passport setup


//* routes -- !Important! -- this first function sets up access control. i.e. what data types can post to your server* //
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + indexFile);
});

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

app.post('/register', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });

  newUser.save((err, result) => {
    if(err) {
      res.json({ success: false, error: err});
    } else {
      res.json({ success: true })
    }
  });
});


app.post('/login', passport.authenticate('local'), function (req, res) {
  res.json({ success: true, user: req.user});
})

app.post('/newDoc', (req, res) => {
  const newDoc = new Doc({
    name: req.body.name,
    owner: req.user._id
  });

  newDoc.save((err, result) => {
    if(err) {
      res.json({ success: false, error: err});
    } else {
      res.json({ success: true, doc: result })
    }
  });
});

app.get('/getmydocs', (req, res) => {
  Doc.find({ owner: req.user._id}, (err, result) => {
    if(err) {
      res.json({ success: false, error: err});
    } else {
      res.json({ success: true, docs: result });
    }
  });
});

app.get('/getDoc/:docid', (req, res) => {
  Doc.findById(req.params.docid, (err, result) => {
    if(err) {
      res.json({ success: false, error: err});
    } else {
      res.json({ success: true, doc: result });
    }
  });
});

app.post('/saveDoc/:docid', (req, res) => {
  Doc.update({_id: req.params.docid }, { $set: { content: req.body.content}}, (err, result) => {
    if(err) {
      res.json({ success: false, error: err});
    } else {
      res.json({ success: true, result: result });
    }
  });
});

// * server listener set to localhost 3000 * //
app.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!')
})
