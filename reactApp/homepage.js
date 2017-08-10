var React = require('react');
import SignUp from './signup.js';
import Login from './login.js';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      signup: false,
      login: false,
    };
  }
  componentWillMount(){
  }

  handleSignUp(e){
    e.preventDefault();
    this.setState({signup: true});
  }
  handleLogIn(e){
    e.preventDefault();
    this.setState({login: true});
  }
  render(){
    if(this.state.signup) {
      return(
        <BrowserRouter>
          <div>
            <Redirect to='/signup'/>
            <Route path='/signup' component={ SignUp } />
          </div>
        </BrowserRouter>
      );
    }
    if(this.state.login) {
      return(
        <BrowserRouter>
          <div>
            <Redirect to='/login'/>
            <Route path='/login' component={ Login } />
          </div>
        </BrowserRouter>
      );
    }
    return(
      <div>
          <p>See if this shows up</p>
          <BrowserRouter>
            <div>
              <button onClick={(e) => this.handleSignUp(e)}> Sign up </button>
              <button onClick={(e) => this.handleLogIn(e)}> Log in </button>
            </div>
          </BrowserRouter>

      </div>
    );
  }
}

export default HomePage;
