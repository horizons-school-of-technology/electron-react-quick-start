import React from 'react';
import {Editor} from 'draft-js';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {onChangeAction} from '../actions/actions.js'; // import relevant actions

let TextEdit = ({editorState, onChange}) => {
  return (
      <div>
        <Editor
          editorState={editorState}
          onChange={onChange}
          customStyleMap={styleMap}
        />
      </div>
  );
};

const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
};

TextEdit.propTypes = {
  editorState: PropTypes.object,
  onChange: PropTypes.func
};

const mapStateToProps = state => {
  return {
    editorState: state.editorState
  };
};

const mapDispatchToProps = dispatch => {
    return {
      onChange: (newEditorState) => dispatch(onChangeAction(newEditorState))
    };
};

TextEdit = connect(
    mapStateToProps,
    mapDispatchToProps
)(TextEdit);

export default TextEdit;
