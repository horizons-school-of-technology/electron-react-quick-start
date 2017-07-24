import React from 'react';
import TextEdit from './TextEdit.js';
import Toolbar from './Toolbar.js';

<<<<<<< HEAD:reactApp/components/EditorView.js
class EditorView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {
      return (
        <div>
          <TextEdit />
        </div>
      );
    }
=======
class Editor extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => {}}>Back to Documents Portal</button>
        <h1> This is the document name </h1>
        <p> Sharable Document ID: 69696969 </p>
        <button onClick={() => {}}>Save Changes</button>
        <Toolbar />
        <TextEdit />
      </div>
    );
  }
>>>>>>> f7d720580d9b03d191276f69dbd7b07e3614c1d6:reactApp/components/Editor.js
}

export default EditorView;
