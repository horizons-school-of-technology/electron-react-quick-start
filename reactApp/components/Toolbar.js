import React from 'react';
// import {Editor, EditorState, RichUtils} from 'draft-js';


import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {onBoldClick, onItalicClick, onStrikeClick} from '../actions/actions.js'; // import relevant actions

let Toolbar = ({onBoldClick, onItalicClick, onStrikeClick}) => {
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
      <link rel='stylesheet prefetch' href='http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css'/>
      <link rel='stylesheet prefetch' href='http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css'/>
      <link rel='stylesheet prefetch' href='http://cdnjs.cloudflare.com/ajax/libs/jquery.bootstrapvalidator/0.5.0/css/bootstrapValidator.min.css'/>
      <button className="input-group-addon" style={btn()} onClick={() => onBoldClick()} ><i className="glyphicon glyphicon-bold"></i></button>
      <button className="input-group-addon" style={btn()} onClick={() => onItalicClick()} ><i className="glyphicon glyphicon-italic"></i></button>
      <button className="input-group-addon" style={btn()} onClick={() => onStrikeClick()} ><i className="glyphicon glyphicon-minus"></i></button>

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
    onBoldClick: () => dispatch(onBoldClick()),
    onItalicClick: () => dispatch(onItalicClick()),
    onStrikeClick: () => dispatch(onStrikeClick())
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
  'border': '1px solid gray',
  'display': 'flex',
  'margin': '20px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'background': 'white'
});

const btn = () => ({
  'background': 'white',
  'borderRadius': '4px',
  'width':'35px',
  'height': '35px',
  'color': 'black',
  'margin': '3px'
});

export default Toolbar;
