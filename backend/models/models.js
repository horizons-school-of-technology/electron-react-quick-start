var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI || require('./connect');
mongoose.connect(connect);

var userSchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  documentsIdOwned: {
    type: Array
  }
});


var documentSchema = mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  userOwnedId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  collaboraters: {
    type: Array
  }
});

var User = mongoose.model('User', userSchema);
var Document = mongoose.model('Follow', documentSchema);

module.exports = {
  User: User,
  Document: Document
};
