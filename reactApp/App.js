import React from 'react';
import { Link, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import MyEditor from './MyEditor';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Docs App</h1>
        <Route path='/' exact component={Register} />
        <Route path='/login' exact component={Login} />
        <Route path='/edit' component={MyEditor} />
      </div>


    )
  }
}

export default App;
