import React from 'react';
import axios from 'axios';
import {
  BrowserRouter,
  Redirect,
  Route,
} from 'react-router-dom';
import HomePage from './homepage.js';
import Login from './login.js';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      login: false,
      username: '',
      password: '',
    };
  }
  handleUsername(event) {
    this.setState({ username: event.target.value });
  }
  handlePassword(event) {
    this.setState({ password: event.target.value });
  }
  handleLogIn(e){
    e.preventDefault();
    this.setState({login: true});
  }

  handleSubmit() {
    event.preventDefault();
    const formData = {
      username: this.state.username,
      password: this.state.password,
    };
    axios.post('http://localhost:3000/signup', formData, { headers: {'Accept': 'application/json'} })
      .then((response) => {
        if(response.data.success === true){
          this.setState({redirect: true});
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  render(){
    const { redirect, login } = this.state;

    if (redirect) {
      return (
        <BrowserRouter>
          <div>
            <Redirect to='/home'/>
            <Route path='/home' component={ HomePage }/>
          </div>
        </BrowserRouter>
      );
    }

    if(login) {
      return(
        <BrowserRouter>
          <div>
            <Redirect to='/login'/>
            <Route path='/login' component={ Login } />
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
        <button onClick={() => this.handleSubmit()}>Sign up</button>
        <br/><br/>
        <button onClick={(e) => this.handleLogIn(e)}> Log in </button>
      </div>
    );
  }


}

export default SignUp;
