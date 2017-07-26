import mongoose from 'mongoose';
mongoose.connect('mongodb://Prateek:123@ds125623.mlab.com:25623/google-docs');

const User = require('../../backend/models/models');


export function onChangeAction(newEditorState) {
  return {
    type: 'CHANGED',
    newEditorState
  };
}

// -----------------------------------------------------------------------------
// ------------------------------EditorView Actions-----------------------------
// -----------------------------------------------------------------------------

export function onBoldClick(e) {
  e.preventDefault();
  return {
    type: 'BOLD'
  };
}

export function onItalicClick(e) {
  e.preventDefault();
  return {
    type: 'ITALIC'
  };
}

export function onStrikeClick(e) {
  e.preventDefault();
  return {
    type: 'STRIKETHROUGH'
  };
}

export function onUnderlineClick(e) {
  e.preventDefault();
  return {
    type: 'UNDERLINE'
  };
}

export function onCodeClick(e) {
  e.preventDefault();
  return {
    type: 'CODE'
  };
}

// -----------------------------------------------------------------------------
// ---------------------------DocumentPortal Actions----------------------------
// -----------------------------------------------------------------------------

function newDoc(userId, docName, docId) {
  return {
    type: 'NEW_DOC',
    docName,
    userId,
    docId,
  };
}

export function addSharedDoc(userId, docId) {
  return {
    type: 'ADD_SHARED_DOC',
    docId,
    userId
  };
}

export function openDoc(userId, docId) {
  return {
    type: 'OPEN_DOC',
    docId,
    userId
  };
}

export function deleteDoc(userId, docId) {
  return {
    type: 'DELETE_DOC',
    docId,
    userId
  };
}

export function newDocThunk(userId, docName) {
  return function(dispatch) {
    const doc = new Document({
      title: docName,
      userOwnedId: userId,
      collaborators: [userId]
    });

    return doc.save()
              .then()
  }
}
