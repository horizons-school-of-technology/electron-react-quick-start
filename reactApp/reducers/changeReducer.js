const changeReducer = (state = EditorState.createEmpty(), action) => {
  switch (action.type) {
    case 'CHANGED':
      return action.newEditorState;
    default:
      return state;
  }
};



export default changeReducer;
