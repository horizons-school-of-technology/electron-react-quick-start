import React from 'react';
import {Editor} from 'draft-js';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {onChangeAction} from '../actions/actions.js'; // import relevant actions

let TextEdit = ({editorState, onChange}) => {
  // this will be done in reducers
  // constructor(props) {
  //   super(props);
  //   this.state = {editorState: EditorState.createEmpty()};
  //   this.onChange = (editorState) => this.setState({editorState});
  // }

  // This will be done in reducers as well (be careful of this)
  // onBoldClick() {
  //   this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  // }

  // TODO: this.onChange has to be something different w/ redux
  return (
      <div>
        <Editor editorState={editorState} onChange={onChange} />
      </div>
  );
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
