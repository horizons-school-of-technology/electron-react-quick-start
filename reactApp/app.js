import React from 'react';
import ReactDOM from 'react-dom';
import MyEditor from './components/draft';

/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})

ReactDOM.render(
  <div>
    <p>I live in App.js</p>
    <MyEditor />
  </div>
  , document.getElementById('root'));
