var React = require('react');
import { Route, Switch, Link } from 'react-router-dom';
// import MyEditor from './myEditor';
import listDocs from './listDocs';
import Login from './login';
import Register from './register';
import Main from './Main';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div>
          <Route path="/:anything" render={() => <Link to="/">Back to Home</Link>} />
          <Switch>
            <Route exact={true} path='/register' component={Register}/>
            <Route exact={true} path='/login' component={Login}/>
            <Route exact={true} path='/' component={listDocs}/>
            <Route path='/textedit/:docID' component={Main}/>
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
    );
  }
}

export default App;
