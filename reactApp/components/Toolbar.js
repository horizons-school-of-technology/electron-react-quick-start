import React from 'react';
// import {Editor, EditorState, RichUtils} from 'draft-js';


import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {onBoldClick, onItalicClick, onStrikeClick} from '../actions/actions.js'; // import relevant actions
import IconButton from 'material-ui/IconButton';

let Toolbar = ({onBoldClick, onItalicClick, onStrikeClick}) => {
  return (
    <div className="divStyle">
      <IconButton className="input-group-addon" className="btn" tooltip="bold" tooltipPosition="top-right" onMouseDown={(e) => onBoldClick(e)} ><i className="material-icons">format_bold</i></IconButton>
      <IconButton className="input-group-addon" className="btn" tooltip="italic" tooltipPosition="top-right" onMouseDown={(e) => onItalicClick(e)} ><i className="material-icons">format_italic</i></IconButton>
      <IconButton className="input-group-addon" className="btn" tooltip="strikethrough" tooltipPosition="top-right" onMouseDown={(e) => onStrikeClick(e)} ><i className="material-icons">format_strikethrough</i></IconButton>
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
    onBoldClick: (e) => dispatch(onBoldClick(e)),
    onItalicClick: (e) => dispatch(onItalicClick(e)),
    onStrikeClick: (e) => dispatch(onStrikeClick(e))
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



export default Toolbar;
