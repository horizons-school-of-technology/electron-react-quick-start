import {EditorState, RichUtils} from 'draft-js';

const editorReducer = (state = EditorState.createEmpty(), action) => {
  switch (action.type) {
  case 'CHANGED':
    return action.newEditorState;
  case 'BOLD':
    return RichUtils.toggleInlineStyle(state, 'BOLD');
  case 'ITALIC':
    return RichUtils.toggleInlineStyle(state, 'ITALIC');
  case 'STRIKETHROUGH':
    return RichUtils.toggleInlineStyle(state, 'STRIKETHROUGH');
  case 'UNDERLINE':
    return RichUtils.toggleInlineStyle(state, 'UNDERLINE');
  case 'CODE':
    return RichUtils.toggleInlineStyle(state, 'CODE');
  default:
    return state;
  }
};

export default editorReducer;
