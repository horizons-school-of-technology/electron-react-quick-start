var mongoose = require ('mongoose');
var connect = process.env.MONGODB_URI;

var Schema = mongoose.Schema;

mongoose.connect(connect);

var userSchema = new Schema({

});

var documentSchema = new Schema({

});

var User = mongoose.model('User', userSchema);
var Document = mongoose.model('Document', documentSchema);

module.exports = {
  User: User,
  Document: Document,
};
