import mongoose from 'mongoose';
var connect = process.env.MONGODB_URI || require('./connect');
mongoose.connect(connect);

import {EditorState} from 'draft-js';

var userSchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  documentsOwned: {
    type: Array
  },
  documentsShared: {
    type: Array
  }
});


var documentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  editorState: {
    type: EditorState
  },
  userOwnedId: {
    type: String,
    required: true
  },
  collaborators: {
    type: Array,
    required: true
  }
});

var User = mongoose.model('User', userSchema);
var Document = mongoose.model('Follow', documentSchema);

module.exports = {
  User: User,
  Document: Document
};
