import React from 'react';
// import {Editor, EditorState, RichUtils} from 'draft-js';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {onBoldClick, onItalicClick, onStrikeClick} from '../actions/actions.js'; // import relevant actions

let Toolbar = ({onBoldClick, onItalicClick, onStrikeClick}) => {
    return (
      <div style={divStyle()}>
        <button style={btn()} onClick={() => onBoldClick()} >Bold</button>
        <button style={btn()} onClick={() => onItalicClick()}>Italic</button>
        <button style={btn()} onClick={() => onStrikeClick()}>Strikethrough</button>
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
      onBoldClick: () => dispatch(onBoldClick()),
      onItalicClick: () => dispatch(onItalicClick()),
      onStrikeClick: () => dispatch(onStrikeClick())
    };
};

Toolbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar);





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
