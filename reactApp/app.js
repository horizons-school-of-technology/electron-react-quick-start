var React = require('react');
var ReactDOM = require('react-dom');
import { HashRouter } from 'react-router-dom';
import MamaApp from './components/MamaApp.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import injectTapEventPlugin from 'react-tap-event-plugin';
//
// injectTapEventPlugin()

require('./css/main.css');

ReactDOM.render(
  <HashRouter>
    <MuiThemeProvider>
      <MamaApp />
    </MuiThemeProvider>
  </HashRouter>,
    document.getElementById('root'));

/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})
