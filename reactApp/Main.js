import React from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';


class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  testUser() {
    axios.get("http://localhost:3000/testUser", {
      withCredentials: true
    })
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((err) => console.log(err))
  }

  render() {
    return (
      <div>
        You made it!
        <button onClick={() => this.testUser()}>Test User</button>
        <Link to='/login'>Go Back to Login</Link>
      </div>
    )
  }
}

export default Login;
