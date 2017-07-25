import React from 'react';
import {Link, Route} from 'react-router-dom';
import TextEdit from './TextEdit.js';
import Toolbar from './Toolbar.js';
import DocumentPortal from './DocumentPortal.js';

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
      <div className='outsideStyle'>
        <div className='centeredTxt'>
          <h1> This is the document name </h1>
          <p> Sharable Document ID: 69696969 </p><br></br>
        </div>
        <div className='centeredBtn'>
          <button onClick={() => this.onBack()}>Back to Documents Portal</button><br></br>
          <button onClick={() => this.onSave()}>Save Changes</button><br></br>
        </div>
        <Toolbar />
        <div className='textStyle'><TextEdit/></div>
      </div>
    );
  }
}

export default EditorView;
