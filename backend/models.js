const mongoose = require('mongoose');

const User = mongoose.model('User', {
  username: {
    required: true,
    unique: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
});

const Doc = mongoose.model('Doc', {
  name: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  password: {
    type: String
  },
  content: {
    default: '',
    type: String
  },
  collaborators: {
    default: [],
    type: Array
  }
});

module.exports = {
  User: User,
  Doc: Doc
};
