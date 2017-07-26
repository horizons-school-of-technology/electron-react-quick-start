/**
* -------------------------------------------------------------------
* This file will serve as our mongodb Schema and Model definitions
* -------------------------------------------------------------------
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
* User Schema
* username:    string needed to identify the username
* password:    string to valid login information
* docs:  to see which documents the user created
*/

var User = mongoose.model('User', {
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  docs: {
    type: Array,
    default: [],
  }
});

/**
* Docs Schema
* collaborators:   which users can access the document
*/
var Doc = mongoose.model('Doc', {
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  collaborators: {
    type: Array,
  },
  versions: {
    type: Array,
  },
});

// Export our models!
module.exports = {
  User: User,
  Doc: Doc,
};
