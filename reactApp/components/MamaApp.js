import React from 'react';
import { Link, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import MyEditor from './MyEditor.js'

class MamaApp extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Doc Apps</h1>
        <Route path='/' exact component={Register} />
        <Route path='/login' exact component={Login} />
        {/* <MyEditor /> */}
        {/* <Toolbar /> */}
      </div>
    )
  }
}

export default MamaApp;
