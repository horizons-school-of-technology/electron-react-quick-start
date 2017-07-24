import {EditorState, RichUtils} from 'draft-js';

const editorReducer = (state = {editorState: EditorState.createEmpty()}, action) => {
  switch (action.type) {
    case 'BOLD':
      return RichUtils.toggleInlineStyle(state.editorState, 'BOLD');
    case 'CHANGED':
      return action.newEditorState;
    default:
      return state;
  }
};

export default editorReducer;
