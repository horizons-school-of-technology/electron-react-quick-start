import React from 'react';
import axios from 'axios';
import {
  BrowserRouter,
  Redirect,
  Route,
} from 'react-router-dom';
import Documents from './documents.js';
import SignUp from './signup.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      username: '',
      password: '',
      signup: false,
    };
  }
  handleUsername(event) {
    this.setState({ username: event.target.value });
  }
  handlePassword(event) {
    this.setState({ password: event.target.value });
  }
  handleSignUp(e){
    e.preventDefault();
    this.setState({signup: true});
  }

  handleSubmit() {
    event.preventDefault();
    const formData = {
      username: this.state.username,
      password: this.state.password,
    };
    axios.post('http://localhost:3000/login', formData, { headers: {'Accept': 'application/json'} })
      .then((response) => {
        if(response.data.success === true){
          this.setState({redirect: true});
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  render(){
    const { redirect, signup } = this.state;

    if (redirect) {
      return (
        <BrowserRouter>
          <div>
            <Redirect to='/document'/>
            <Route path='/document' component={ Documents } />
          </div>
        </BrowserRouter>
      );
    }

    if(signup) {
      return(
        <BrowserRouter>
          <div>
            <Redirect to='/signup'/>
            <Route path='/signup' component={ SignUp } />
          </div>
        </BrowserRouter>
      );
    }

    return (
      <div>
        <input
          type='text'
          placeholder='user name'
          onChange={(event) => this.handleUsername(event)}
          value={this.state.username}
        />
        <input
          type='text'
          placeholder='password'
          onChange={(event) => this.handlePassword(event)}
          value={this.state.password}
        />
        <button onClick={() => this.handleSubmit()}>Login</button>
        <br /><br/>
        <button onClick={(e) => this.handleSignUp(e)}> Sign up </button>
      </div>
    );
  }


}

export default Login;
