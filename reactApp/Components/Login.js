import React from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';


class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  login() {
    axios.post("http://localhost:3000/login", {
      username: this.refs.username.value,
      password: this.refs.password.value,
    }, {
      withCredentials: true
    })
    .then((resp) => {
      if (resp.data.success) {
        console.log("success", resp.data.user);
        this.props.history.push('/docportal')
      } else {
        console.log("err", resp);
      }
    })
    .catch((err) => console.log(err))
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <input type="text" placeholder="username" ref="username"></input>
        <input type="password" placeholder="password" ref="password"></input>
        <button onClick={() => this.login()}>Login</button>
        <Link to='/'>Go To Register</Link>
      </div>
    )
  }
}

export default Login;
