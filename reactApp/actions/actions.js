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
