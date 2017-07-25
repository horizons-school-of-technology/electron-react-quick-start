import React from 'react';
import axios from 'axios';
import {Editor, EditorState} from 'draft-js';
import styles from '../styles/styles';
import '../styles/container.scss';
import { Link } from 'react-router-dom';

const docsArr = ['onedoc', 'twodoc', 'threedoc', 'fourdoc', 'onedoc', 'twodoc', 'threedoc', 'fourdoc', 'onedoc', 'twodoc', 'threedoc', 'fourdoc', 'onedoc', 'twodoc', 'threedoc', 'fourdoc', 'onedoc', 'twodoc', 'threedoc', 'fourdoc', 'onedoc', 'twodoc', 'threedoc', 'fourdoc', 'onedoc', 'twodoc', 'threedoc', 'fourdoc', 'onedoc', 'twodoc', 'threedoc', 'fourdoc', 'onedoc', 'twodoc', 'threedoc', 'fourdoc', 'onedoc', 'twodoc', 'threedoc', 'fourdoc'];

class DocumentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentIds: ['yo'],
      documents: []
    };
    this.createDoc = this.createDoc.bind(this);
  }
  componentDidMount() {
    axios({
      method: 'post',
      url: 'http://localhost:3000/docs',
      data: {
        userId: this.props.userId,
      }
    })
    .then((resp) => {
      console.log("DocsList Fetch Response: ", resp);
      this.setState({documentIds: resp.data.user.docs});
    })
    .catch(err => console.log("DocsList Fetch Error Response: ", err));

    var docsObjPromiseArr = this.state.documents.map((doc) => {
      return new Promise(function(res, rej) {
        axios({
          method: 'post',
          url: 'http://localhost:3000/editor',
          data: {
            docId: doc.id
          }
        }, function(err, res) {
          if (err) {
            rej(err);
            return;
          } else {
            res(res);
          }
        });
      });
    });
    this.setState({documents: Promise.all(docsObjPromiseArr)});
  }
  createDoc() {
    axios({
      method: 'post',
      url: 'http://localhost:3000/createDoc',
      data: {
        title: this.props.userId,
        author: this.,
        password:
      }
    })
    .then((resp) => {
      console.log("DocsList Fetch Response: ", resp);
      this.setState({documentIds: resp.data.user.docs});
    })
    .catch(err => console.log("DocsList Fetch Error Response: ", err));
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
              this.state.documents.then((docs) => {
                docs.map((doc) => {
                  if (doc.isOwner) {
                    // The <p> tags should have Links around them!
                    return (<p style={styles.p}>{doc.title}</p>);
                  }
                });
              })
            }
          </div>
          <div className="card2">
            <h1 style={styles.h2}>My Collaborations</h1>
            <hr style={styles.hr}></hr>
            {
              this.state.documents.then((docs) => {
                docs.map((doc) => {
                  if (doc.isOwner) {
                    // The <p> tags should have Links around them!
                    return (<p style={styles.p}>{doc.title} by: <i>{doc.author}</i></p>);
                  }
                });
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default DocumentsList;
