var React = require('react');
var ReactDOM = require('react-dom');
import {Redirect, Link} from 'react-router-dom';
var axios = require('axios');
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      isRegistered: false
    }
  }

  onSubmit() {
    // Send a POST request
    axios({
      method: 'POST',
      url: 'http://localhost:3000/registration', //need to define this route
      data: {
        username: this.state.username,
        password: this.state.password, //TODO: Hash this password?
      }
    })
    .then(response => {
      if (response.data.success){
        this.setState({isRegistered: true});
      } else {
        console.log('server error with registration, try back later please!')
      };
    });
  }

  render() {
    if(this.state.isRegistered){
      return(
        <Redirect to='/login'/>
      )
    } else {
      return(
        <div>
          <center>
            <br/><br/>
          <h1> C U R L D O C S</h1>
          <h3>REGISTER</h3>
          <TextField
            id="text-field-default"
            floatingLabelText="username"
            floatingLabelStyle={{'color': '#B39DDB'}}
            underlineFocusStyle={{'borderBottom': 'solid #000000'}}
            onChange={(event) => this.setState({username: event.target.value })}
            type="text"
            name="username">
            </TextField>
              <br/>
          <TextField
            id="text-field-default"
            floatingLabelText="password"
            floatingLabelStyle={{'color': '#B39DDB'}}
            underlineFocusStyle={{'borderBottom': 'solid #000000'}}
            onChange={(event) => this.setState({password: event.target.value})}
            type="password"
            name="password">
            </TextField>
              <br/> <br/> <br/>
          <FlatButton
            style={{'display': 'flex'}}
            hoverColor='#B39DDB'
            label="register"
            onClick={() => this.onSubmit()}></FlatButton>
          <FlatButton
            fullWidth={false}
            hoverColor='#B39DDB'
            label="back to login"
            containerElement={<Link to="/login" />}
            >
          </FlatButton>
          </center>
        </div>
      )
    }
  }
}

module.exports = Registration;
