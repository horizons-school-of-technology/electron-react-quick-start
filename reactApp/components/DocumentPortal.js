import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import {indigo50, indigo100} from 'material-ui/styles/colors';
import NewDoc from 'material-ui/svg-icons/action/note-add';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';

// TODO: import {Documents} from 'path to models'

const tempStyles = {
  toolbarStyle: {
    'backgroundColor': '#2481b7',
    'height': '80px',
    'width': '800px',
    'justifyContent': 'center'
  },
  separator: {
    'backgroundColor': indigo50,
    'marginLeft': '15px',
    'marginRight': '15px',
    'height': '60px'
  },
  textFieldStyle: {
    'fontColor': indigo50,
    'fontSize': '1.5em',
    'width': '550px',
    'marginRight': '32px'
  },
  groupStyle: {
    'display': 'flex',
  },
  topPaper: {
    'width': '100%',
    'height': '150px',
    'justifyContent': 'center',
    'alignItems': 'center'
  },
  newDocStyle: {
    'width': '48px',
    'height': '48px',
  },
  newDocButtonStyle: {
    'width': '80px',
    'height': '80px'
  }

};
class DocumentPortal extends React.Component {

  onSharedClick() {
     // TODO: assign actions for when the add shared document button is clicked
  }

  render() {
    return (
      <div>
          <div>
            <Paper style={tempStyles.topPaper} zDepth={1} children={
              <Toolbar style={tempStyles.toolbarStyle}>
                <ToolbarGroup style={tempStyles.groupStyle}>
                  <TextField
                    hintText="I like big butts and I cannot lie"
                    underlineStyle={{color: indigo50}}
                    underlineFocusStyle={{color: indigo50}}
                    hintStyle={{color: indigo100}}
                    style={tempStyles.textFieldStyle}
                  />
                  <ToolbarSeparator style={tempStyles.separator}/>
                  <IconButton tooltip="Create Document" iconStyle={tempStyles.newDocStyle} style={tempStyles.newDocButtonStyle}>
                    <NewDoc color={indigo50}/>
                  </IconButton>
                </ToolbarGroup>
              </Toolbar>
            }/>

          </div>
        <form action="/action_page.php">
          <input type="text" name="docName" placeholder="New Document Name" ></input>
          <input type="submit" value="Submit"></input>
        </form>
        <form action="/action_page.php">
          <input type="text" name="docID" placeholder="Document ID"></input>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    );
  }
}

export default DocumentPortal;
