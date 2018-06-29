var express = require('express');
var router = express.Router();
var models = require('../models/models');
var Document = models.Document;
var User = models.User;


// router.post('/new', function (req, res) {
//   var newDoc = new Document({
//     name: req.body.name,
//     password: req.body.password,
//     author: req.session.passport.user,
//     collaborators: [req.session.passport.user]
//   });
//   newDoc.save(function(error, doc){
//     if(error){
//       res.send("Error signing up");
//     } else {
//       // console.log("HERE", doc);
//       User.findById(doc.author, function(err, user){
//         if(err) {
//           res.send("Error finding user");
//         } else {
//           user.documents.push(doc._id);
//           user.collabDocs.push(doc._id);
//           user.save();
//           res.json({success: true, doc: doc, user: user});
//         }
//       });
//     }
//   });
// });

router.post('/new', function(req, res){
  User.findById(req.session.passport.user, function(err, user){
    if(err){
      res.send("error finding user");
    } else {
      // console.log("user is", user);
      var newDoc = new Document({
        name: req.body.name,
        password: req.body.password,
        author: user.username,
        collaborators: [user.username],
      });
      newDoc.save(function(err, doc){
        if(err) {
          res.send("error saving doc");
        } else {
          // console.log("doc is", doc);
          user.documents.push(doc.name);
          user.collabDocs.push(doc.name);
          user.save();
          res.json({success: true, doc: doc, user: user});
        }
      });
    }
  });
});

// router.post('/collab', function (req, res) {
//   Document.findOne({name: req.body.collabName}, function(err, doc){
//     if(err){
//       res.send("document does not exist");
//     } else {
//       // console.log('doc here is', doc);
//       if(doc.password !== req.body.collabPassword){
//         res.send("incorrect password");
//       } else {
//         // console.log('doc is', doc);
//         doc.collaborators.push(req.session.passport.user);
//         doc.save();
//         User.findById(req.session.passport.user, function(err, user){
//           if(err) {
//             res.send("error finding user");
//           } else {
//             user.collabDocs.push(doc._id);
//             user.save();
//             res.json({success: true, doc: doc, user: user});
//           }
//         });
//       }
//     }
//   });
// });

router.post('/collab', function(req, res){
  User.findById(req.session.passport.user, function(err, user){
    if(err) {
      res.send("error finding user");
    } else {
      Document.findOne({name: req.body.collabName}, function(err, doc){
        if(err){
          res.send("document does not exist");
        } else {
          if(doc.password !== req.body.collabPassword){
            res.send("incorrect password");
          } else {
            doc.collaborators.push(user.username);
            doc.save();
            user.collabDocs.push(doc.name);
            user.save();
            res.json({success: true, doc: doc, user: user});
          }
        }
      });
    }
  });
});

router.post('/save/textedit/:docID', function (req, res) {
  Document.findByIdAndUpdate(req.params.docID, {content: req.body.content}, function(err, doc){
    if(err){
      res.send("Error finding document");
    } else {
      res.json({success: true, doc: doc});
    }
  });
});

router.get('/textedit/:docID', function(req, res){
  Document.findById(req.params.docID, function(err, doc){
    if(err){
      console.log("ERROR finding this document in the database: ", err);
    } else {
      res.json({success: true, doc: doc});
    }
  });
});

// router.get('/textedit:docID', function (req, res) {
//   res.send('arrived at special docid page');
// });
router.get('/', function(req, res){
  User.findById(req.session.passport.user, function(err, user){
    if(err) {
      res.send("error finding user");
    } else {
      Document.find({collaborators: user.username}, function(err, result){
        if(err){
          console.log('ERROR finding all documents user is collaborator on: ', err);
        } else {
          res.json({result: result, user: user});
        }
      });
    }
  });
});

// router.get('/', function (req, res) {
//   Document.find({collaborators: req.session.passport.user}, function(err,result){
//     if(err){
//       console.log('ERROR finding all documents user is collaborator on: ', err);
//     } else {
//       // console.log('RESULT IS: ', result);
//       User.findById(req.session.passport.user, function(err, user){
//         if(err) {
//           res.send("error finding user");
//         } else {
//           res.json({result: result, user: user});
//         }
//       });
//     }
//   });
// });
module.exports = router;
