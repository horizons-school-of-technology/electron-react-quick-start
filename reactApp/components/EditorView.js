import React from 'react';
import TextEdit from './TextEdit.js';
import Toolbar from './Toolbar.js';

// TODO: import {Documents} from 'path to models'

class EditorView extends React.Component {
  onSave() {
    // TODO: if document exists, update. Else, create and save

  }

  onBack() {
    // TODO: if document is not saved, notify user that changes could
    // be lost. Prompt for save in this modal as well. Continue button in
    // modal too
  }

  render() {
    return (
      <div style={outsideStyle()}>
        <div style={centered()}>
          <h1> This is the document name </h1>
          <p> Sharable Document ID: 69696969 </p><br></br>
        </div>
        <div style={centeredBtn()}>
          <button onClick={() => this.onBack()}>Back to Documents Portal</button>
          <button onClick={() => this.onSave()}>Save Changes</button><br></br>
        </div>
        <Toolbar />
        <div style={textStyle()}><TextEdit/></div>
      </div>
    );
  }
}

const centeredBtn = () => ({
  'display': 'flex',
  'margin': '20px',
    'alignItems': 'center',
  'justifyContent': 'center',
});

const centered = () => ({
  'display': 'flex',
  'flex-direction': 'column',
  'margin': '20px',
  'alignItems': 'center',
  'justifyContent': 'center',

});

const textStyle = () => ({
  'border': '4px solid black',
  'margin': '20px',
  'height': '300px',
  'background': 'white'
});

const outsideStyle = () => ({
  // 'background': '#eef6f6',
  'height': '100%',
  'background': '#ededed'
});

export default EditorView;
