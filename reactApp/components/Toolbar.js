import React from 'react';
// import {Editor, EditorState, RichUtils} from 'draft-js';


import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {onBoldClick, onItalicClick, onStrikeClick} from '../actions/actions.js'; // import relevant actions

let Toolbar = ({onBoldClick, onItalicClick, onStrikeClick}) => {
  return (

    <div className="divStyle">
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
      <link rel='stylesheet prefetch' href='http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css'/>
      <link rel='stylesheet prefetch' href='http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css'/>
      <link rel='stylesheet prefetch' href='http://cdnjs.cloudflare.com/ajax/libs/jquery.bootstrapvalidator/0.5.0/css/bootstrapValidator.min.css'/>
      <button className="input-group-addon" className="btn" onMouseDown={(e) => onBoldClick(e)} ><i className="glyphicon glyphicon-bold"></i></button>
      <button className="input-group-addon" className="btn" onMouseDown={(e) => onItalicClick(e)} ><i className="glyphicon glyphicon-italic"></i></button>
      <button className="input-group-addon" className="btn" onMouseDown={(e) => onStrikeClick(e)} ><i className="glyphicon glyphicon-minus"></i></button>

      {/* <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
      <button style={btn()} onClick={() => {}}>Italic</button>
      <button style={btn()} onClick={() => {}}>Underline</button> */}
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
