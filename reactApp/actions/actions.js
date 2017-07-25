export function onChangeAction(newEditorState) {
  return {
    type: 'CHANGED',
    newEditorState
  };
}

export function onBoldClick() {
  return {
    type: 'BOLD'
  };
}

export function onItalicClick() {
  return {
    type: 'ITALIC'
  };
}

export function onStrikeClick() {
  return {
    type: 'STRIKETHROUGH'
  };
}
