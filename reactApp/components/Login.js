import React from 'react';
import {Editor, EditorState} from 'draft-js';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <h1>Login</h1>
        <p>Username</p>
        <input type="text" placeholder="Username"></input>
        <p>Password</p>
        <input type="text" placeholder="Username"></input> <br></br>
        <button>Submit</button>
      </div>
    );
  }
}

export default Login;
