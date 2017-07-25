import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import {blue800, indigo100, grey50} from 'material-ui/styles/colors';
import NewDoc from 'material-ui/svg-icons/action/note-add';
import {Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
// TODO: import {Documents} from 'path to models'

class DocumentPortal extends React.Component {

  onSharedClick() {
     // TODO: assign actions for when the add shared document button is clicked
  }

  render() {
    return (
      <div>
        <Toolbar color={blue800}>
          <TextField
            hintText="I like big butts and I cannot lie"
            floatingLabelText="Create a new document"
            color={indigo100}
          /><br />
          <ToolbarSeparator />
          <IconButton>
            <NewDoc color={grey50}/>
          </IconButton>
        </Toolbar>
        <button onClick={() => this.onSharedClick()}> Add Shared Document </button>
        <button onClick={() => this.onAddClick()}> Add new Document </button>
      </div>
    );
  }
}

export default DocumentPortal;
