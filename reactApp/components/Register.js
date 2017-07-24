import React from 'react';
import {Editor, EditorState} from 'draft-js';

class Register extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <h1>Register</h1>
        <p>Username</p>
        <input type="text" placeholder="Username"></input>
        <p>Password</p>
        <input type="text" placeholder="Username"></input> <br></br>
        <button>Submit</button>
      </div>
    );
  }
}

export default Register;
