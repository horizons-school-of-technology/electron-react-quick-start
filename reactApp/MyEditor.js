import React from 'react';
import {Editor, EditorState} from 'draft-js';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      title: '...'
    };

    this.onChange = (editorState) => this.setState({editorState});
  }

  render() {
    return (
      <div>
        <h1>Editing {this.state.title}</h1>
        <div style={editorStyle} onClick={() => this.refs.editor.focus()}>
          <Editor
            ref="editor"
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

const editorStyle = {border: '2px solid black', minHeight: '200px'};

export default MyEditor;
