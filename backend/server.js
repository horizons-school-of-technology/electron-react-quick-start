const express = require('express');
const app = express();
var models = require('../models/models');
var Document = models.Document;

// Example route
app.get('/', function (req, res) {
  res.send('Hello World!');
});

//routes are not right!!!!!!!
app.post('create Doc', function(req, res) {
  var Document = new Document ({
    title: req.body.title
  });
  Document.save(function(err){
    if(err){
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

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
