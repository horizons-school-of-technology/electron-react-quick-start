import React from 'react';
import TextEdit from './TextEdit.js';

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
}

export default EditorView;
