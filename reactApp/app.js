var React = require('react');
var ReactDOM = require('react-dom');

import Login from './components/Login';
import Register from './components/Register';
import TextEditor from './components/TextEditor';
import DocumentsList from './components/DocumentsList';

/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
//   .then(resp => resp.text())
//   .then(text => console.log(text))
//   .catch(err => {throw err;});

ReactDOM.render(<DocumentsList userId="5976dbc9c3aa6f127785eda6"/>,
   document.getElementById('root'));
