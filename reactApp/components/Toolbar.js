import React from 'react';
// import {Editor, EditorState, RichUtils} from 'draft-js';

const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];


class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div style={divStyle()}>
        <div className="RichEditor-controls">
          {INLINE_STYLES.map(type =>
            <button
              // key={type.label}
              // active={currentStyle.has(type.style)}
              // label={type.label}
              // onToggle={props.onToggle}
              style={type.style}
            />
          )}
        </div>
        <button style={btn()} onClick={() => {}}>Bold</button>
        <button style={btn()} onClick={() => {}}>Italic</button>
        <button style={btn()} onClick={() => {}}>Strikethrough</button>
      </div>
    );
  }
}

// const InlineStyleControls = (props) => {
//   var currentStyle = props.editorState.getCurrentInlineStyle();
//   return (
//
//   );
// };

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
