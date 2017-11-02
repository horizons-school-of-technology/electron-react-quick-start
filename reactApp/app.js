var React = require('react');
var ReactDOM = require('react-dom');
import App from './Components/App.js';
import { HashRouter } from 'react-router-dom';


ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
   document.getElementById('root'));
