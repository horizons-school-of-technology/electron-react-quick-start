export function onChangeAction(newEditorState) {
  return {
    type: 'CHANGED',
    newEditorState
  };
}

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

export function newDoc(userId, docName, docId) {
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
