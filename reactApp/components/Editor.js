import React from 'react';
import TextEdit from './TextEdit.js';
import Toolbar from './Toolbar.js';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

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
}

export default Editor;
