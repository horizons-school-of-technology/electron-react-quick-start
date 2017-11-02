import React from 'react';
import {Editor, EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import { Link } from 'react-router-dom';
import axios from 'axios';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      title: '...'
    };

    this.onChange = (editorState) => this.setState({editorState});
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/getDoc/${this.props.match.params.docid}`)
    .then((resp) => {
      const doc = resp.data.doc;

      if (doc.content === '') {
        this.setState({
          title: doc.name
        });
        return;
      }

      const rawContentState = JSON.parse(doc.content);
      const contentState = convertFromRaw(rawContentState);
      const newEditorState = EditorState.createWithContent(contentState);

      this.setState({
        title: doc.name,
        editorState: newEditorState
      })
    })
  }

  updateDoc() {
    const contentState = this.state.editorState.getCurrentContent();
    // console.log(contentState);
    const rawContentState = convertToRaw(contentState);
    // console.log(rawContentState);
    const stringContent = JSON.stringify(rawContentState);
    // console.log(stringContent);

    axios.post(`http://localhost:3000/updateDoc/${this.props.match.params.docid}`, {
      content: stringContent
    })
    .then((resp) => {
      console.log(resp.data);
    })
  }

  render() {
    return (
      <div>
        <h1>Editing {this.state.title}</h1>
        <h4>Shareable ID: {this.props.match.params.docid}</h4>
        <div style={editorStyle} onClick={() => this.refs.editor.focus()}>
          <Editor
            ref="editor"
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
        <div>
          <button onClick={() => this.updateDoc()}>Save Doc</button>
        </div>
        <Link to="/docportal">Back to DocPortal</Link>
      </div>
    );
  }
}

const editorStyle = {border: '2px solid black', minHeight: '200px'};

export default MyEditor;
