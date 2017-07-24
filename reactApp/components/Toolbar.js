import React from 'react';
// import {Editor, EditorState, RichUtils} from 'draft-js';


import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {onBoldClick} from '../actions/actions.js'; // import relevant actions

let Toolbar = ({onBoldClick}) => {
    return (
      <div style={divStyle()}>
        {/* <div className="RichEditor-controls">
          {INLINE_STYLES.map(type =>
            <button
              // key={type.label}
              // active={currentStyle.has(type.style)}
              // label={type.label}
              // onToggle={props.onToggle}
              style={type.style}
            />
          )}
        </div> */}
        <button style={btn()} onClick={() => onBoldClick()} >Bold</button>
        <button style={btn()} onClick={() => {}}>Italic</button>
        <button style={btn()} onClick={() => {}}>Strikethrough</button>
      </div>
    );
};

Toolbar.propTypes = {
  onBoldClick: PropTypes.func
};

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
    return {
      onBoldClick: () => dispatch(onBoldClick())
      // any outgoing actions go here
    };
};

Toolbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar);





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
