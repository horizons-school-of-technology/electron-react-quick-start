var React = require('react');
var ReactDOM = require('react-dom');
import MyEditor from './editor.js';

/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})

ReactDOM.render(<div>
  <p>Please show up</p>
  <MyEditor />
</div>,
   document.getElementById('root'));
