var React = require('react');
var Promise = require('es6-promise').Promise;
import axios from 'axios';

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
    };
  }
  componentWillMount() {
    var promise = new Promise(function(resolve, reject) {
      axios.get('http:localhost:3000/documents')
      .then((resp) => {
        console.log('get all the docs', resp);
        resolve(resp.data.documents);
      });
    });

    promise.then((result) => {
      console.log(result);
      this.setState({documents: result});

      const { documents } = this.state;

      console.log('documents length', documents.length, documents);

      if(documents.length === 0) {
        this.setState({message: 'you have no documents'});
      }else{
        const array = [];
        documents.forEach((doc, index) => {
          array.push(<li key={index} onClick={() => this.handleDocClick()}>{doc.name}</li>);
        });
        this.setState({message: array});
        console.log(this.state.message);
      }
    });
  }

  handleDocName(event) {
    this.setState({ documentName: event.target.value });
  }
  // handlePassword(event) {
  //   this.setState({ password: event.target.value });
  // }
  handleDocClick() {
    console.log('I am clicking the document');
  }
  handleDocId(event) {
    this.setState({ documentId: event.target.value });
  }

  //---------------------------------------------------------------------------------------------------------------------
  newDocument() {
    event.preventDefault();
    const formData = {
      name: this.state.documentName,
      // password: this.state.password,
    };
    axios.post('http://localhost:3000/newdoc', formData, { headers: {'Accept': 'application/json'} })
      .then((response) => {
        console.log('make doc', response);
        if(response.data.success === true){
          this.setState({redirect: true});
          console.log('make a new doc success!');
        }
      }).catch((error) => {
        console.log(error);
      });
  }
  //---------------------------------------------------------------------------------------------------------
  joinDocument() {
    event.preventDefault();
    const formData = {
      id: this.state.documentName,
    };
    axios.post('http://localhost:3000/joindoc', formData, { headers: {'Accept': 'application/json'} })
      .then((response) => {
        console.log('join doc', response);
        if(response.data.success === true){
          this.setState({redirect: true});
          console.log('Join a doc success!');
        }
      }).catch((error) => {
        console.log(error);
      });
  }
  //=========================================================================================================================
  render(){

    return(
      <div>
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
