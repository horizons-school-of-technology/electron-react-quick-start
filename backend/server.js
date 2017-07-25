const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const User = require('./models/models').User;
const Doc = require('./models/models').Doc;
const server = require('http').Server(app);
const io = require('socket.io')(server);

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

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// END PASSPORT HERE --------------------------------------------------------

// SOCKET HANDLER ------------------------------------------------------------
io.on('connection', socket => {
  console.log('connected');
  socket.on('newEvent', function() {
    console.log('NEW EVENT HAS BEEN EMITTED');
  });
  // socket.on('username', username => {
  //   if (!username || !username.trim()) {
  //     return socket.emit('errorMessage', 'No username!');
  //   }
  //   socket.username = String(username);
});
// END SOCKET HANDLER --------------------------------------------------------

app.get('/', (req, res) => {
  res.send('Hit the / route!');
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/user' , // TODO change the redirect link
    failureRedirect: '/failureLogin',
    failureFlash: "Incorrect Login Credentials",
    successFlash: "Login Successful!"
  })
);

app.post('/register', (req, res) => {
  console.log("Hey!");
  var username = req.body.username;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;

  if(!isValidRegistration(username, password, confirmPassword)) {
    res.send("Invalid Registration details!");
  }
  saveUserInMongoDB(username, password);
  res.end();
});

// Login Success!
app.get('/user', (req, res) => {
  res.send({success: true});
});

// Login Failed!
app.get('/failureLogin', (req, res) => {
  res.send({success: false});
});

app.post('/docs', (req, res) => {
  var userId = req.body.userId;
  User.findById(userId)
  .then((user) => {
    res.json({user: user});
  })
  .catch((err) => {
    res.json({failure: err});
  });
});

app.post('/createDoc', (req, res) => {
  var newDoc = new Doc({
    title: req.body.title,
    author: req.body.userId,
    password: req.body.password
  });
  newDoc.save((err, doc) => {
    if (err) {
      res.json({failure: err});
    }
    User.findById(req.body.userId)
    .then((user) => {
      user.docs.push(doc._id);
    });
  });
});


app.post('/editor', (req, res) => {
  var docId = req.body.docId;
  Document.findOne({id: docId})
  .then((doc) => {
    res.json({doc: doc});
  });
});

// Error handler/Catch 404 ---------------------------------------------------
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// ---------------------------------------------------------------------------

server.listen(3000, () => {
  console.log('Backend server for Electron Docs App running on port 3000!');
});

/**
 * This function saves a newly registered user into MongoDB
 * @param username
 * @param password
 * @return
 */
const saveUserInMongoDB = (username, password) => {
  new User({
    username,
    password
  })
  .save((err) => {
    if(err) {
      console.log("Error creating new user: ", err);
      return false;
    }
    console.log("User created!");
    return true;
  });
};

// @TODO Use passport to validate that the registered user is valid?????
const isValidRegistration = (username, password, confirmPassword) => {
  return true;
};
