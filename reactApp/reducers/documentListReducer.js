const mongoose = require('mongoose');
const {User, Document} = require('../../backend/models/models');
mongoose.connect(process.env.MONGODB_URI);

const documentListReducer = (state = [], action) => {
  switch (action.type) {

    //TODO: call this when first logging in (think about re-rendering)
  case 'RENDER_DOCUMENTS': {
    User.findById(action.userId)
        .then((userObj) => {
          return {docsOwned: userObj.documentsOwned, docsShared: userObj.documentsShared};
        });
        break;
  }
    //TODO: check the flow for this. Should be called after clicking new doc btn
  case 'NEW_DOC': {
    // Create new document
    const doc = new Document({
      title: action.docName,
      userOwnedId: action.userId,
      collaborators: [action.userId]
    });

    // save the new doc to the db
    doc.save()
        .then((err, docSaved) => {
          return docSaved._id;
        })
        // add the saved doc (id and name) to user who made it
        .then((newDocId) => {
          User.findById(action.userId)
              .then((err, usr) => {
                usr.documentsOwned = usr.documentsOwned.push({docName: action.docName, docId: newDocId, isShared: false});
                usr.save();
                return {docsOwned: usr.documentsOwned, docsShared: usr.documentsShared};
              });
          return;
        })
        .catch((err) => {
          console.log('Error creating new document', err);
        });
    break;
  }
    //TODO: add a shared doc to user and doc
  case 'ADD_SHARED_DOC': {
    // update the doc
    Document.findById(action.docId)
            .then((err, doc) => {
              doc.collaborators = doc.collaborators.push({userId: action.userId});
              doc.save();
              return doc;
            })
            .then((doc) => {
              // update the user
              User.findById(action.userId)
                  .then((err, usr) => {
                    usr.documentsShared = usr.documentsShared.push({docName: doc.title, docId: doc._id});
                    usr.save();
                    return {docsOwned: usr.documentsOwned, docsShared: usr.documentsShared};
                  });
            })
            .catch((err) => {
              console.log('Error creating new document', err);
            });
    break;
  }
  default: {
    return state;
  }
  }
};

export default documentListReducer;
