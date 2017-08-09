var React = require('react');
var Promise = require('es6-promise').Promise;
import axios from 'axios';
import Editor from './editor.js';
import HomePage from './homepage.js';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';

class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      documents: [],
      documentName: "",
      // password: String,
      documentId: "",
      redirect: false,
      message: '',
      stateId: '',
      logout: false,
    };
  }
  componentWillMount() {
    var promise = new Promise(function(resolve, reject) {
      axios.get('http:localhost:3000/documents')
      .then((resp) => {
        resolve(resp.data.documents);
      });
    });

    promise.then((result) => {
      this.setState({documents: result});

      const { documents } = this.state;

      if(documents.length === 0) {
        this.setState({message: 'you have no documents'});
      }else{
        const array = [];
        documents.forEach((doc, index) => {
          array.push(<li key={index} onClick={() => this.handleDocClick(doc._id)}>{doc.name}</li>);
        });
        this.setState({message: array});
      }
    });
  }

  handleDocName(event) {
    this.setState({ documentName: event.target.value });
  }
  // handlePassword(event) {
  //   this.setState({ password: event.target.value });
  // }
  handleDocClick(id) {
    this.setState({redirect: true, stateId: id});
  }
  handleDocId(event) {
    this.setState({ documentId: event.target.value });
  }
  handleLogout() {
    axios.get('http:localhost:3000/logout')
    .then((resp) => {
      if(resp.data.success){
        console.log('log out successfully');
        this.setState({logout: true});
      }
    });
  }

  //---------------------------------------------------------------------------------------------------------------------
  newDocument() {
    const formData = {
      name: this.state.documentName,
      // password: this.state.password,
    };
    axios.post('http://localhost:3000/newdoc', formData, { headers: {'Accept': 'application/json'} })
      .then((response) => {
        if(response.data.success === true){
          this.setState({redirect: true, stateId: response.data.id});
          console.log('make a new doc success!');
        }
      }).catch((error) => {
        console.log(error);
      });
  }
  //---------------------------------------------------------------------------------------------------------
  joinDocument() {
    const formData = {
      id: this.state.documentName,
    };
    axios.post('http://localhost:3000/joindoc', formData, { headers: {'Accept': 'application/json'} })
      .then((response) => {
        if(response.data.success === true){
          const id = this.state.documentId;
          this.setState({redirect: true, stateId: id});
          console.log('Join a doc success!');
        }
      }).catch((error) => {
        console.log(error);
      });
  }
  //=========================================================================================================================
  render(){
    if(this.state.redirect){
      var redirectString = '/editor/' + this.state.stateId;
      return (
        <BrowserRouter>
          <div>
            <Redirect to={redirectString} />
            <Route path='/editor/:id' component={ Editor } />
          </div>
        </BrowserRouter>
      );
    }
    if(this.state.logout){
      return (
        <BrowserRouter>
          <div>
            <Redirect to='/homepage' />
            <Route path='/homepage' component={ HomePage } />
          </div>
        </BrowserRouter>
      );
    }

    return(
      <div>
        <button onClick={() => this.handleLogout()}>Logout</button>
        <div>
          <h3>Create a new document: </h3>
          <input
            type='text'
            placeholder='document name'
            onChange={(event) => this.handleDocName(event)}
            value={this.state.documentName}
          />
          {/* <input
            type='text'
            placeholder='password'
            onChange={(event) => this.handlePassword(event)}
            value={this.state.password}
          /> */}
          <button onClick={() => this.newDocument()}>Create Document</button>
        </div>
        <div>
          <h2> Your documents: </h2>
          {this.state.message}
        </div>
        <div>
          <h4>Join other people's documents: </h4>
          <input
            type='text'
            placeholder='Paste the doc id'
            onChange={(event) => this.handleDocId(event)}
            value={this.state.documentId}
          />
          <button onClick={() => this.joinDocument()}>Join Document</button>
        </div>
      </div>
    );

  }
}

export default Documents;
