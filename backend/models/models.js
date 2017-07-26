const mongoose = require('mongoose');
// TODO: figure out who has the mongo
// var connect = process.env.MONGODB_URI || require('./connect');
mongoose.connect(process.env.MONGODB_URI);

import {EditorState} from 'draft-js';

const userSchema = mongoose.Schema({
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


const documentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  editorState: {
    //TODO: figure out the editorstate type
    type: Object
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
