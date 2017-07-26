const express = require('express');
const app = express();
const models = require('../models/models');
const Document = models.Document;
const User = models.User;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Example route
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// -----------------------------------------------------------------------------
// ------------------------Login/Registration Routes----------------------------
// -----------------------------------------------------------------------------
app.post('/login', function(req, res){
  // TODO: req will have username and pass. Check in Mongo,
  // successRedirect: '/documents' IDEA: set state.userId to this user's id (maybe username too?)
  // failureRedirect: '/login'
});

app.post('/register', function(req, res){
  // TODO: req will have username and pass. Save new user in mongo
  // redirect to login
});

// -----------------------------------------------------------------------------
// --------------------------DocumentPortal Routes------------------------------
// -----------------------------------------------------------------------------
app.post('/create', function(req, res) {
  // Create new document
  const doc = new Document({
    title: req.body.docName,
    userOwnedId: req.body.userId,
    collaborators: [req.body.userId]
  });

  // save the new doc to the db
  doc.save()
      .then((err, docSaved) => {
        return docSaved._id;
      })
      // add the saved doc (id and name) to user who made it
      .then((newDocId) => {
        User.findById(req.body.userId)
            .then((err, usr) => {
              usr.documentsOwned = usr.documentsOwned.push({docName: req.body.docName, docId: newDocId});
              usr.save();
              return {docsOwned: usr.documentsOwned, docsShared: usr.documentsShared};
            });
        return;
      })
      .catch((err) => {
        console.log('Error creating new document', err);
      });
});

app.post('/addShared', function(req, res){
  // TODO: update document's collaborators, update user's sharedDoc list, re-render
});

// -----------------------------------------------------------------------------
// -----------------------------EditorView Routes-------------------------------
// -----------------------------------------------------------------------------

app.post('save changes', function(req, res) {
  var documentId = req.body.documentId; //i don't know what it is called
  Document.findById(documentId, function(err, doc){
    if(err){
      console.log(err);
    } else {
      doc.content = req.body.text; //i don't know how it works with react
      doc.save(function(err){
        if(err){
          console.log(err);
        } else {
          console.log("Document save!!!");
        }
      });
    }
  });
});

app.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!');
});
