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
    type: Schema.ObjectId,
    ref: 'Doc',
  }
});

/**
* Docs Schema
* collaborators:   which users can access the document
*/
var Doc = mongoose.model('Doc', {
  collaborators: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User',
  },
  // versions: {
  //   // Add later
  // },
});




// Export our models!
module.exports = {
  User: User,
  Doc: Doc,
};
