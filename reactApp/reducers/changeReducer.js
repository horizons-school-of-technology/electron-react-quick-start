const changeReducer = (state = {editorState: EditorState.createEmpty()}, action) => {
  switch (action.type) {
    case 'CHANGED':
      return action.newEditorState;
    default:
      return state;
  }
};



export default changeReducer;
