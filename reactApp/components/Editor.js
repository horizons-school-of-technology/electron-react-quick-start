import React from 'react';
import TextEdit from './TextEdit.js';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        {/* <input type="submit">Back to Documents Portal</input>
        <h1> This is the document name </h1>
        <h1> Sharable Document ID: 69696969 </h1>
        <input type="submit">Save Changes</input> */}
        <button onClick={() => {}}>Back to Documents Portal</button>
        <h1> This is the document name </h1>
        <p> Sharable Document ID: 69696969 </p>
        <button onClick={() => {}}>Save Changes</button>
        <TextEdit />
      </div>
    );
  }
}

export default Editor;
