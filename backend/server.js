const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Models = require('../models/models.js');
const User = Models.User;
const session = require('express-session');
const Document = Models.Document;
const crypto = require('crypto');

const server = require('http').Server(app);
const io = require('socket.io')(server);

const path              = require('path');
const compress          = require('compression');
const webpack               = require('webpack');
const webpackDevMiddleware  = require("webpack-dev-middleware");
const webpackHotMiddleware  = require('webpack-hot-middleware');
const config                = require('../webpack.config');

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  },
  hot: true,
  historyApiFallback: true
}));
app.use(webpackHotMiddleware(compiler));

function hashPassword(password){
  var hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}
//express setup
app.use(session({secret: 'my secret string'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    var hashedPassword = hashPassword(password);
    User.findOne({username: username}, function(err, user){
      if(err){return done(err);}
      if(!user){
        return done(null, false);
      }
      if(user.password !== hashedPassword){
        return done(null, false);
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

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.use(compress());

// Example route
app.get('/', function (req, res) {
  res.sendFile(path.join(publicPath, 'index.html'));
});

io.on('connection', socket => {
  console.log('connected');

});

app.post('/login', passport.authenticate('local'), function(req, res){
  if(req.user){
    res.json({success: true});
  }else{
    res.json({success: false});
  }
});

app.post('/signup', function(req, res) {
  if(req.body.username.length !== 0 &&
        req.body.password.length !== 0){

    var user = new User({
      username: req.body.username,
      password: hashPassword(req.body.password)
    });

    user.save(function(err){
      if(!err){
        console.log("successfully saved!");
        res.json({success: true});
      }
    });
  }
});

app.get('/documents', function(req, res){
  User.findById(req.user._id)
  .exec((err, user) => {
    if(err) console.log('error finding user in documents part', err);
    res.json({documents: user.documents});
  });
});

app.post('/newdoc', function(req, res){
  User.findById(req.user._id)
  .exec((err, user) => {
    var doc = new Document({
      name: req.body.name,
      owner: user,
      content: "",
      contributors: [user],
    });
    doc.save(function(err, d){
      if(!err){
        console.log("successfully saved document!");
        res.json({success: true, id: d._id});
      }else{
        return;
      }
      user.documents.push(doc);
      user.save();
    });
  });

});

app.post('/joindoc', function(req, res){
  Document.findById(req.body.id)
  .exec(function(err, doc){
    if(!err) {
      User.findById(req.user.id)
      .exec(function(err, user){
        var docExists = false;
        user.documents.forEach(function(docObj){
          if(docObj._id.toString === doc._id.toString){
            docExists = true
          }
        })
        if(!docExists){
          user.documents.push(doc);
        }
        user.save();
        res.json({success: true});
      });
    }
  });
});

app.post('/getdoc', function(req, res){
  Document.findById(req.body.id)
  .exec(function(err, doc){
    if(!err) {
      res.json({name: doc.name, id: doc._id, content: doc.content, username: req.user.username});
    }else{
      console.log(err);
    }
  });
});

app.post('/save', function(req, res){
  Document.findByIdAndUpdate(req.body.id, {
    $set: {content: req.body.content}
  }, function(err){
    if(!err) {
      console.log('update document success!');
      res.json({success: true});
    }
  });
});

app.get('/logout', function(req, res){
  req.logout();
  console.log('logout success!');
  res.json({success: true});
});
// app.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });

app.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!');
});
