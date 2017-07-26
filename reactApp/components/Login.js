import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../styles/styles';
import '../styles/container.scss';

/**
 * This component allows the user to attempt to login to our app,
 * and if successful, will be brought to the list of documents they have saved.
 * If they are unsuccessful, we will keep them on the login page.
 */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.makeLoginRequest = this.makeLoginRequest.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  makeLoginRequest() {
    axios({
      method: 'post',
      url: 'http://localhost:3000/login',
      data: {
        username: this.state.username,
        lastName: this.state.password,
      }
    })
      .then((resp) => {console.log("Login Response: ", resp);})
      .catch(err => console.log("Login Error Response: ", err));
  }

  render() {
    return(
      <div className="alignCenter">
        <div className="spacer50"></div>
        <div className="spacer"></div>
        <form onSubmit={this.makeLoginRequest}>
          <h1 className="h1NoMargin">Login</h1>
          <div className="alignRow">
              <span className="icon"><i className="fa fa-user-o" aria-hidden="true"></i></span>
            <input
              type="text"
              placeholder="Username"
              value={this.state.username}
              style={styles.inputBox}
              onChange={this.handleUsernameChange}></input>
          </div>
          <div className="alignRowC">
            <span className="icon"><i className="fa fa-lock" aria-hidden="true"></i></span>
            <input
              type="password"
              placeholder="Password"
              style={styles.inputBox}
              value={this.state.password}
              onChange={this.handlePasswordChange}></input> <br></br>
          </div>
          <div className="alignRowC">
            <input
              type="submit"
              style={styles.buttonMedNoMarginG}
              ></input>
              <Link to="/register" style={styles.buttonMedNoMarginO}>Register</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
