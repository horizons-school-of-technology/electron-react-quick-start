var React = require('react');
var ReactDOM = require('react-dom');
import App from './Router';
require('./css/main.css');
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { HashRouter } from 'react-router-dom';
 /* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})



ReactDOM.render(<HashRouter><MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}><App /></MuiThemeProvider></HashRouter>,
   document.getElementById('root'));
