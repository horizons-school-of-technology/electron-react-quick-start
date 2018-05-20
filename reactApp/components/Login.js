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
          this.props.history.push('/userDocs')
        } else {
          console.log("err", resp);
        }
      })
      .catch((error) => console.log(error))
    }

  render() {
    return (
      <div className="login">
        <h3>Login</h3>
        <input type="text" placeholder="username" ref="username"></input>
        <input type="text" placeholder="password" ref="password"></input>
        <button onClick={() => this.login()}>Login</button>
        <br />
        <Link to='/register'>Go To Register</Link>
      </div>
    )
  }
}

export default Login;
