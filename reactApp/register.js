import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Register extends React.Component {
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
    axios.post('http://localhost:3000/register', {username: this.state.username, password: this.state.password}, {withCredentials: true})
    .then(function (response) {
      // console.log("response", response);
      if(response.data.success){
        self.props.history.push('/login');
      } else {
        console.log("register redirect error", response.data.error);
      }
      // this.setState({
      //   username: "",
      //   password: "",
      // });
    })
    .catch(function (error) {
      console.log("register post request error", error);
    });
  }



  render() {
    return (
      <div>
        <h1>Welcome to the Register Page</h1>
        <div>
          <input type="text" placeholder="username" value={this.state.username} onChange={(event) => this.handleUsername(event)}/>
          <input type="password" placeholder="password" value={this.state.password} onChange={(event) => this.handlePassword(event)}/>
          <button onClick={(event) => this.handleSubmit(event)}>Register</button>
        </div>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }
}

export default Register;
