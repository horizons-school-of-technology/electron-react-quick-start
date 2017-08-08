var mongoose = require ('mongoose');
var connect = process.env.MONGODB_URI;

var Schema = mongoose.Schema;

mongoose.connect(connect);

var userSchema = new Schema({
  username: String,
  password: String,
  documents: Array,
});

var documentSchema = new Schema({
  name: String,
  password: String,
  owner: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  contributors: Array,
});

var User = mongoose.model('User', userSchema);
var Document = mongoose.model('Document', documentSchema);

module.exports = {
  User: User,
  Document: Document,
};
