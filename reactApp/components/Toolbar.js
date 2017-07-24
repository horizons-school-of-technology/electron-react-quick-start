import React from 'react';
// import {Editor, EditorState, RichUtils} from 'draft-js';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div style={divStyle()}>
        <button style={btn()} onClick={() => {}}>Bold</button>
        <button style={btn()} onClick={() => {}}>Italic</button>
        <button style={btn()} onClick={() => {}}>Strikethrough</button>
      </div>
    );
  }
}

const divStyle = () => ({
  'border': '2px solid black',
  'display': 'flex',
  'margin': '20px',
  'alignItems': 'center',
  'justifyContent': 'center',
});

const btn = () => ({
  'background': 'red',
  'borderRadius': '8px',
  'color': 'white'
});

export default Toolbar;
