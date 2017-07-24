import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';

class TextEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  render() {
    return (
        <div>
          <button onClick={() => this.onBoldClick()}>Bold</button>
          <Editor editorState={this.state.editorState} onChange={this.onChange} />
        </div>
    );
  }
}

export default TextEdit;
