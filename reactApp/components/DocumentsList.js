import React from 'react';
import {Editor, EditorState} from 'draft-js';
import styles from '../styles/styles';
import '../styles/container.scss';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

const docsArr = ['onedoc', 'twodoc', 'threedoc', 'fourdoc', 'onedoc', 'twodoc', 'threedoc', 'fourdoc', 'onedoc', 'twodoc', 'threedoc', 'fourdoc', 'onedoc', 'twodoc', 'threedoc', 'fourdoc', 'onedoc', 'twodoc', 'threedoc', 'fourdoc', 'onedoc', 'twodoc', 'threedoc', 'fourdoc', 'onedoc', 'twodoc', 'threedoc', 'fourdoc', 'onedoc', 'twodoc', 'threedoc', 'fourdoc', 'onedoc', 'twodoc', 'threedoc', 'fourdoc', 'onedoc', 'twodoc', 'threedoc', 'fourdoc'];

class DocumentsList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <h1 style={styles.title}>👋🏼  Hey Asif!</h1>
        <div className="alignRow">
          <input type="text" style={styles.inputBox} placeholder="e.g. Asif's Grocery List"></input>
          <button style={styles.buttonLong}>
            <span><i className="fa fa-plus-circle" aria-hidden="true"></i> New Document</span>
          </button>
          <input type="text" style={styles.inputBox} placeholder="Document ID here"></input>
          <button style={styles.buttonLongY}>
            <span><i className="fa fa-users" aria-hidden="true"></i> Collaborate</span>
          </button>
        </div>
        <div className="spacer"></div>
        <div className="alignRow">
          <div className="card">
            <h1 style={styles.h2}>My Documents</h1>
            <hr style={styles.hr}></hr>
            {
              docsArr.map((doc) => {
                return (<p style={styles.p}>{doc}</p>);
              })
            }
          </div>
          <div className="card2">
            <h1 style={styles.h2}>My Collaborations</h1>
            <hr style={styles.hr}></hr>
            {
              docsArr.map((doc) => {
                // The <p> tags should have Links around them!
                return (<p style={styles.p}>{doc}</p>);
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default DocumentsList;
