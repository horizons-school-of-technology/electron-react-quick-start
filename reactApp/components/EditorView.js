import React from 'react';
import TextEdit from './TextEdit.js';
import Toolbar from './Toolbar.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

// TODO: import {Documents} from 'path to models'

const styles = {
  title: {
    cursor: 'pointer',
  },
};

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
        <AppBar
          style={{
            backgroundColor: '#3F51B5'
          }}
          title={<span style={styles.title}>This is the document title</span>}
          iconElementLeft={<IconButton onClick={() => this.onBack()}><i className="material-icons">arrow_back</i></IconButton>}
          iconElementRight={<FlatButton onClick={() => this.onSave()} label="Save Changes" />}
        />
        <MuiThemeProvider>
          <Toolbar />
        </MuiThemeProvider>
        <div className='textStyle'><TextEdit/></div>
      </div>
    );
  }
}

export default EditorView;
