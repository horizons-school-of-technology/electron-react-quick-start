import React from 'react';
import { Link, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import MyEditor from './MyEditor.js';
import UserDocsPortal from './UserDocsPortal';

class MamaApp extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          <Route path='/' exact component={Login} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/edit/:docid' exact component={MyEditor} />
          <Route path='/userDocs' exact component={UserDocsPortal} />
        {/* <Toolbar /> */}
      </div>
    )
  }
}

export default MamaApp;
