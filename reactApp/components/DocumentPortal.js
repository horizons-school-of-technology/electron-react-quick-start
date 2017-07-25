import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import {indigo50, indigo100} from 'material-ui/styles/colors';
import NewDoc from 'material-ui/svg-icons/action/note-add';
import {Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
// TODO: import {Documents} from 'path to models'

const tempStyles = {
  toolbarStyle: {
    'backgroundColor': '#2481b7',
    'height': '100px'
  },
  separator: {
    'backgroundColor': indigo50
  },
  textFieldStyle: {
    'marginBottom': '5px',
    'display': 'flex',
    'alignItems': 'center',
    'fontColor': indigo50
  }

};
class DocumentPortal extends React.Component {

  onSharedClick() {
     // TODO: assign actions for when the add shared document button is clicked
  }

  render() {
    return (
      <div>
        <Toolbar style={tempStyles.toolbarStyle}>
          <ToolbarGroup>
            <TextField
              hintText="I like big butts and I cannot lie"
              floatingLabelText="Create a new document"
              floatingLabelStyle={{color: indigo50}}
              floatingLabelFocusStyle={{color: indigo50}}
              underlineFocusStyle={{borderColor: indigo50}}
              hintStyle={{color: indigo100}}
              style={tempStyles.textFieldStyle}
            /><br />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarSeparator style={tempStyles.separator}/>
            <IconButton tooltip="Create Document">
              <NewDoc color={indigo50}/>
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <form action="/action_page.php">
          <input type="text" name="docName" value="New Document Name"></input>
          <input type="submit" value="Submit"></input>
        </form>
        <form action="/action_page.php">
          <input type="text" name="docID" value="Document ID"></input>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    );
  }
}

export default DocumentPortal;
