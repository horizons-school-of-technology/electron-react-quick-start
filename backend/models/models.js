const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: {
    required: true,
    unique: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
	docList: [{
		type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
	}]
})

const docsSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
	password: {
    type: String
  },
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  ts: {
    type: Date
  },
  lastEdited: {
    type: Date
  },
  contentState: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);
const Document = mongoose.model('Document', docsSchema);


module.exports = {
  User: User,
  Document: Document
};
