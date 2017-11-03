import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleUsername(event) {
    this.setState({username: event.target.value});
  }

  handlePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    var self = this;
    axios.post('http://localhost:3000/login', {username: this.state.username, password: this.state.password}, {withCredentials: true})
    .then(function (response) {
      // console.log("response", response);
      if(response.data.success){
        self.props.history.push({
          pathname: '/',
          // state: {detail: response.data.user.username}
        });
      } else {
        console.log("login redirect error", response.data.error);
      }
    })
    .catch(function (error) {
      console.log("login post request error", error);
    });
  }

  render() {
    return (
      <div>
        <h1>Welcome to the Login Page</h1>
        <div>
          <input type="text" placeholder="username" onChange={(event) => this.handleUsername(event)}/>
          <input type="password" placeholder="password" onChange={(event) => this.handlePassword(event)}/>
          <button onClick={(event) => this.handleSubmit(event)}>Login</button>
        </div>
        <Link to="/register">Register</Link>
      </div>
    );
  }
}

export default Login;
