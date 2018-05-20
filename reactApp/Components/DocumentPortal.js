import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class DocumentPortal extends React.Component {
  constructor(props) {
    super(props);

  this.state = {
    docs: [],
    sharedDocs: [],
    user: '',
    newDocumentName: ''
  }
}

  newDoc() {
    axios.post('http://localhost:3000/newDoc/', {
      name: this.state.newDocumentName,
      owner: this.props.match.params.userid
    })
    .then((resp) => {
      console.log(resp);
      this.setState({docs: this.state.docs.concat(resp.data.doc)})
    })
  }

  logout() {
    axios.post('http://localhost:3000/logout')
    .then((resp) => {
        this.props.history.replace('/');
    })
    .catch((error) => console.log(error))
  }

  componentWillMount() {
    const userId = this.props.match.params.userid;
    axios.get('http://localhost:3000/getDocuments/' + userId)
    .then((resp) => {
      console.log('the response is here ', resp);
      resp.data.docs.forEach(doc => {
        if(doc.owner === userId) {
          this.setState({
            docs: [...this.state.docs, doc]
          });
        } else if (doc.collaborators.includes(userId)) {
          sharedDocs: [...this.state.sharedDocs, doc]
        }
      })
    });
  }

  render() {
    return (
      <div className='page-container'>
        <div className='document-header'>
          <button className='logout-button' onClick={() => this.logout()}>Logout</button>
          <h3>Documents Portal</h3>
        </div>
        <div className='create-or-share-document-div'>
          <input
            type="text"
            placeholder="New Document"
            name="newdocument"
            value={this.state.newDocumentName || ''}
            onChange={(event) => { this.setState({ newDocumentName: event.target.value })}}
            style={{width: '30%'}}
          />
          <button style={{border: 'solid black 1px', padding: '5px', borderRadius: '10px', height: '3%', backgroundColor: 'lightgrey'}} onClick={() => this.newDoc()}>
            Create Document
          </button>
        </div>
        <div className="document-container">
          <div className="document-list">
            <p>My Documents:</p>
            <ul>
              {this.state.docs.map((doc) => <div key={doc._id.toString()}><Link to={`/editDocument/${doc._id}`}>{doc.name}</Link></div>)}
            </ul>
          </div>
        </div>
        <br />
        <div className='create-or-share-document-div'>
          <input style={{width:'30%'}}type="text" placeholder="paste a docID to collab on a doc" ref="sharedDoc" />
          <button style={{border: 'solid black 1px', padding: '5px', borderRadius: '10px', height: '3%', backgroundColor: 'lightgrey'}}>Add Shared Doc</button>
        </div>
      </div>
    )
  }
}

export default DocumentPortal;
