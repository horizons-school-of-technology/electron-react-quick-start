var React = require('react');
import {
  Editor,
  EditorState,
  RichUtils,
  DefaultDraftBlockRenderMap
} from 'draft-js';

import * as colors from 'material-ui/styles/colors';
// import TextToolBox from './TextToolBox';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';

import { CirclePicker } from 'react-color';
import { Map } from 'immutable';
const myBlockTypes = DefaultDraftBlockRenderMap.merge(new Map({
  center: {
    wrapper: <div className='center-align'/>
  },
  right: {
    wrapper: <div className="right-align"/>
  }
}));

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      currentFontSize: 12,
      DocID: 132132132132132,
      inlineStyles: {}
    };
    this.onChange = (editorState) => this.setState({editorState});
  }

  openColorPicker(e) {
    this.setState({
      colorPickerOpen: true,
      colorPickerButton: e.target
    })
  }

  closeColorPicker(e) {
    this.setState({
      colorPickerOpen: false
    });
  }

  colorPicker() {
    return (
      <div style={{display: 'inline-block'}}>
        <RaisedButton
          backgroundColor={colors.orange200}
          icon={<FontIcon className="material-icons">format_color_text</FontIcon>}
          onClick={this.openColorPicker.bind(this)}
        />
         <Popover
            open={this.state.colorPickerOpen}
            anchorEl={this.state.colorPickerButton}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.closeColorPicker.bind(this)}
          >
          <CirclePicker onChangeComplete={this.formatColor.bind(this)}/>
        </Popover>
      </div>
    );
  }

  onChange(editorState) {
    this.setState({
      editorState
    })
  }

  toggleFormat(e, style, block) {
    e.preventDefault();
    if (block) {
      this.setState({
        editorState: RichUtils.toggleBlockType(this.state.editorState, style)
      })
    }
      else {
        this.setState({
          editorState: RichUtils.toggleInlineStyle(this.state.editorState, style)
        })
      }
  }

  formatButton({icon, style, block}){
    return (
      <RaisedButton
        backgroundColor={
          this.state.editorState.getCurrentInlineStyle().has(style) ?
          colors.orange800 :
          colors.orange200
        }
        onMouseDown={(e) => this.toggleFormat(e, style, block)}
        icon={<FontIcon className="material-icons">{icon}</FontIcon>}
      />
    );
  }

  formatColor(color) {
    var newInlineStyles = Object.assign(
      {},
      this.state.inlineStyles,
      {
        [color.hex]: {
          color: color.hex
        }
      }
    );
    this.setState({
      inlineStyles: newInlineStyles,
      editorState: RichUtils.toggleInlineStyle(this.state.editorState, color.hex)
    })
  }

  applyIncreaseFontSize(shrink) {
    var newFontSize = this.state.currentFontSize + (shrink ? -4 : 4);
    var newInlineStyles = Object.assign(
      {},
      this.state.inlineStyles,
      {
        [newFontSize]: {
          fontSize: `${newFontSize}px`
        }
      }
    );
    this.setState({
      inlineStyles: newInlineStyles,
      editorState: RichUtils.toggleInlineStyle(this.state.editorState, String(newFontSize)),
      currentFontSize: newFontSize
    });
  }

  increaseFontSize(shrink) {
    return (
      <RaisedButton
        backgroundColor={colors.orange200}
        onMouseDown={() => this.applyIncreaseFontSize(shrink)}
        icon={<FontIcon className="material-icons">{shrink ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}</FontIcon>}
      />
    );
  }

  render() {
    return (
      <div>
      <button> Back to Documents </button>
      <AppBar title="Glaze Docs" />
      <div className="toolbar">
        {this.formatButton({icon: 'format_bold', style: 'BOLD'})}
        {this.formatButton({icon: 'format_italic', style: 'ITALIC'})}
        {this.formatButton({icon: 'format_underline', style: 'UNDERLINE'})}
        {this.colorPicker()}
        {this.formatButton({icon: 'format_list_numbered', style: 'ordered-list-item', block: true})}
        {this.formatButton({icon: 'format_align_left', style: 'unstyled', block: true})}
        {this.formatButton({icon: 'format_align_center', style: 'center', block: true})}
        {this.formatButton({icon: 'format_align_right', style: 'right', block: true})}
        {this.formatButton({icon: 'format_align_right', style: 'right', block: true})}
        {this.increaseFontSize(false)}
        {this.increaseFontSize(true)}
      </div>
      <br />
        <Editor
          ref="editor"
          blockRenderMap={myBlockTypes}
          customStyleMap={this.state.inlineStyles}
          onChange={this.onChange.bind(this)}
          className='testEditor'
          editorState={this.state.editorState} />
      </div>
    );
  }
}

export default MyEditor;
