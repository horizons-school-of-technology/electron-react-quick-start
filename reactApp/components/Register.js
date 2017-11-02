import React from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';


class Register extends React.Component {
  constructor(props) {
    super(props);
  }



  register() {
    axios.post("http://localhost:3000/register", {
      'username': this.refs.username.value,
      'password': this.refs.password.value,
    }, {
      withCredentials: true,
    })
    .then((resp) => {
      if (resp.data.success) {
        this.props.history.push('/login')
      } else {
        console.log(resp.data.error);
      }
    })
    .catch((err) => console.log(err))
  }

  render() {
    return (
      <div className="register">
        <h3>Register</h3>
        <input type="text" placeholder="username" ref="username"></input>
        <input type="text" placeholder="password" ref="password"></input>
        <button onClick={() => this.register()}>Register</button>
        <br />
        <Link to='/login'>Go To Login</Link>
      </div>
    )
  }
}

export default Register;
