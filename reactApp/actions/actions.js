export function onBoldClick() {
  return {
    type: 'BOLD'
  };
}

export function onChangeAction(newEditorState) {
  return {
    type: 'CHANGED',
    newEditorState
  };
}
