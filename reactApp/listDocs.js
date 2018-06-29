import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class listDocs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      collabName: "",
      collabPassword: "",
      data: [],
    };
  }

  handleName(event) {
    this.setState({name: event.target.value});
  }

  handlePassword(event) {
    this.setState({password: event.target.value});
  }

  handleCollabName(event) {
    this.setState({collabName: event.target.value});
  }

  handleCollabPass(event) {
    this.setState({collabPassword: event.target.value});
  }

  onNewDoc(event) {
    var self = this;
    event.preventDefault();
    axios.post('http://localhost:3000/new', {name: this.state.name, password: this.state.password}, {withCredentials: true})
    .then(function (response) {
      // console.log("new doc response", response);
      if(response.data.success){
        self.setState({
          data: self.state.data.concat(response.data.doc)
        });
        self.props.history.push(`/textedit/${response.data.doc._id}`);
      }
    })
    .catch(function (error) {
      console.log("new doc error", error);
    });
  }

  onCollab(event) {
    var self = this;
    event.preventDefault();
    axios.post('http://localhost:3000/collab', {collabName: this.state.collabName, collabPassword: this.state.collabPassword}, {withCredentials: true})
    .then(function (response) {
      // console.log("collab response", response);
      if(response.data.success){
        self.setState({
          data: self.state.data.concat(response.data.doc)
        });
        self.props.history.push(`/textedit/${response.data.doc._id}`);
      }
    })
    .catch(function (error) {
      console.log("collab error", error);
    });
  }

  componentDidMount() {
    var self = this;
    // console.log("HELLO THERE", self.props);
    axios.get('http://localhost:3000', {withCredentials: true})
    .then(function (response) {
      // console.log('LIST DOCS RESPONSE', response);
      self.setState({
        data: response.data.result,
        currentUser: response.data.user.username
      });
    })
    .catch(function (error) {
      console.log("Mount list docs error", error);
    });
  }

  render() {
    return (
      <div>
        <div>
          <Link to="/register">Register</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
        <h1>HOME</h1>
        <h2>Welcome: {this.state.currentUser}</h2>
        <div>
          <input type="text" placeholder="name" onChange={(event) => this.handleName(event)}/>
          <input type="password" placeholder="password" onChange={(event) => this.handlePassword(event)}/>
          <button onClick={(event) => this.onNewDoc(event)}>New Doc</button>
        </div>
        <div>
          <input type="text" placeholder="name" onChange={(event) => this.handleCollabName(event)}/>
          <input type="password" placeholder="password" onChange={(event) => this.handleCollabPass(event)}/>
          <button onClick={(event) => this.onCollab(event)}>Collab</button>
        </div>
        <div>
          <ul>
            {this.state.data.map((x) => <li key={x._id}><Link to={'/textedit/' + x._id}>{x.name}</Link></li>)}
          </ul>
        </div>
      </div>
    );
  }
}

export default listDocs;
