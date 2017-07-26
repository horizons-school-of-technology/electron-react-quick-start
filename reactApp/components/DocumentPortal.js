import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {newDoc, addSharedDoc, deleteDoc, openDoc} from '../actions/actions.js';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import {indigo50, indigo100} from 'material-ui/styles/colors';
import NewDoc from 'material-ui/svg-icons/action/note-add';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import axios from 'axios';

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
    'width': '40px',
    'height': '40px',
  },
  newDocButtonStyle: {
    'width': '80px',
    'height': '80px'
  }

};

const onNewDocClick = (userId, docName, onNewClick) => {
  //send axios post request to local host 3000/create, use docId from mongo
  axios.post('http://localhost:3005/create', {
    userId,
    docName,
  })
  .then((resp) => {
    // console.log('name',resp.data.docName,"id",resp.data.docId, 'user', userId);
    // onNewClick(resp.
    onNewClick(resp.data.docName, resp.data.docId, resp.data.isShared);
  });
    //then: dispatch action onNewClick
};

const onSharedDocClick = (userId,  docId, onNewSharedClick) => {
  //send axios post request to local host 3000/addShared
  //then: dispatch action onSharedClick
  console.log('In onSharedDocClick');
  axios.post('http://localhost:3005/addShared', {
    docId,
    userId,
  })
  .then((resp) => {
    console.log('resp', resp);
    // console.log('name',resp.data.docName,"id",resp.data.docId, 'user', userId);
    // onNewClick(resp.
    onNewSharedClick(resp.data.docName, resp.data.docId, resp.data.isShared);
  });
    //then: dispatch action onNewClick
};

const onDeleteDocClick = (userId, docId) => {
  //send axios post request to local host 3000/delete
  //then: dispatch action onDeleteClick
};

const onDocOpenClick = (userId, docId) => {
  //send axios get request to local host 3000/open?docId=
  //then dispatch action onOpenClick
};



let DocumentPortal = ({userId, onNewClick, onNewSharedClick}) => {
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
      <input type="text" id="docName" placeholder="New Document Name" ></input>
      <button onClick={() => onNewDocClick(userId, document.getElementById('docName').value, onNewClick)}>Create</button><br></br>
      <input type="text" id="docId" placeholder="Document ID"></input>
      <button onClick={() => onSharedDocClick(userId, document.getElementById('docId').value, onNewSharedClick)}>Add</button>
    </div>
  );
};

DocumentPortal.propTypes = {
  onNewDocClick: PropTypes.func,
  onNewSharedClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onOpenClick: PropTypes.func,
  userId: PropTypes.String
};

const mapStateToProps = state => {
  return {
    userId: '59791638b114ad48db864b00'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onNewClick: (userId, newDocName, docId) => dispatch(newDoc(userId, newDocName, docId)),
    onNewSharedClick: (userId, newDocName, docId) => dispatch(addSharedDoc(userId, newDocName, docId)),
    onDeleteClick: (userId, docId) => dispatch(deleteDoc(userId, docId)),
    onOpenClick: (userId, docId) => dispatch(openDoc(userId, docId)),
  };
};

DocumentPortal = connect(
    mapStateToProps,
    mapDispatchToProps
)(DocumentPortal);

export default DocumentPortal;
