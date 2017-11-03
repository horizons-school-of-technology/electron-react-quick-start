import React from 'react';
// import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap, convertToRaw, convertFromRaw, SelectionState} from 'draft-js';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import * as colors from 'material-ui/styles/colors';
import {GithubPicker} from 'react-color';
import Popover from 'material-ui/Popover';
import {Map} from 'immutable';
import axios from 'axios';
import io from 'socket.io-client';

const myBlockTypes = DefaultDraftBlockRenderMap.merge(new Map({
  center: {
    wrapper: <div className="center-align"/>
  },
  right: {
    wrapper: <div className="right-align"/>
  }
}));

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      currentFontSize: 12,
      inlineStyles: {},
      author: "",
      collaborators: [],
      docName: "",
    };
  }

  componentDidMount(){
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', () => {
      console.log('connected');
    });
    this.socket.on('globalChange', (text) => {
      // console.log(convertFromRaw(JSON.parse(text)));
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(text)))
      });
    });
    this.socket.on('globalSelection', (data) => {
      console.log(data.selectionState);
      var selectionState = SelectionState.createEmpty(data.selectionState.anchorKey);
      var updatedSelection = selectionState.merge({
        focusKey: data.selectionState.focusKey,
        focusOffset: data.selectionState.focusOffset,
        anchorOffset: data.selectionState.anchorOffset
      });
      console.log('updated selection', updatedSelection);
      console.log(this.state.editorState.getSelection());
      var convertFrom = EditorState.createWithContent(convertFromRaw(JSON.parse(data.stringContentState)));
      this.setState({
        editorState: EditorState.acceptSelection(convertFrom, updatedSelection)
      });
      console.log(this.state.editorState.getSelection());
    });
    var self = this;
    axios.get(`http://localhost:3000${this.props.location.pathname}`, {withCredentials: true})
    .then(function (response) {
      // console.log(response);
      if (response.data.doc.content) {
        self.setState({
          editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(response.data.doc.content))),
          author: response.data.doc.author,
          collaborators: response.data.doc.collaborators,
          docName: response.data.doc.name,
        });
      } else {
        self.setState({
          editorState: EditorState.createEmpty(),
          author: response.data.doc.author,
          collaborators: response.data.doc.collaborators,
          docName: response.data.doc.name,
        });
      }
    })
    .catch(function (error) {
      console.log("MOUNT MAIN error", error);
    });
  }

  onChange(editorState) {
    const contentState = editorState.getCurrentContent();
    const stringContentState = JSON.stringify(convertToRaw(contentState));
    this.socket.emit('change', stringContentState);
    const selectionState = editorState.getSelection();
    console.log('selection state is:', selectionState);
    // const range = selectionState.getRangeAt(0);
    // console.log('range is', range);
    // const stringSelectionState = JSON.stringify(convertToRaw(selectionState));
    // console.log('string is:', stringSelectionState);
    this.socket.emit('selection', {stringContentState: stringContentState, selectionState: selectionState});
    var anchorKey = selectionState.getAnchorKey();
    var currentContent = editorState.getCurrentContent();
    var currentContentBlock = currentContent.getBlockForKey(anchorKey);
    var start = selectionState.getStartOffset();
    var end = selectionState.getEndOffset();
    console.log('end is:', end);
    console.log('start is: ', start);
    console.log('current content block is: ', currentContentBlock.getKey());
    // var selectedText = currentContentBlock.getText().slice(start, end);
    // console.log('selected text is', selectedText);
    this.setState({
      editorState
    });
  }

  toggleFormat(e, style, block){
    e.preventDefault();
    if(block) {
      this.setState({
        editorState: RichUtils.toggleBlockType(this.state.editorState, style)
      });
    }else {
      this.setState({
        editorState: RichUtils.toggleInlineStyle(this.state.editorState, style)
      });
    }
  }

  formatButton({icon, style, block}){
    return (
      <RaisedButton
        backgroundColor={
          this.state.editorState.getCurrentInlineStyle().has(style) ?
          colors.green800 :
          colors.green200
        }
        onMouseDown={(e) => this.toggleFormat(e, style, block)}
        icon={<FontIcon className="material-icons">{icon}</FontIcon>}
      />
    );
  }

  formatColor(color){
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
    });
  }

  openColorPicker(e) {
    this.setState({
      colorPickerOpen: true,
      colorPickerButton: e.target
    });
  }

  closeColorPicker(e) {
    this.setState({
      colorPickerOpen: false,
    });
  }

  colorPicker(){
    return (
      <div style={{display: 'inline-block'}}>
        <RaisedButton
          backgroundColor={colors.green200}
          icon={<FontIcon className="material-icons">format_paint</FontIcon>}
          onClick={this.openColorPicker.bind(this)}
        />
        <Popover
          open={this.state.colorPickerOpen}
          anchorEl={this.state.colorPickerButton}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.closeColorPicker.bind(this) }
          >
          <GithubPicker onChangeComplete={this.formatColor.bind(this)}/>
        </Popover>
      </div>
    );
  }

  applyIncreaseFontSize(shrink){
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

  increaseFontSize(shrink){
    return (
      <RaisedButton
        backgroundColor={colors.green200}
        onClick={() => this.applyIncreaseFontSize(shrink)}
        icon={<FontIcon className="material-icons">{shrink ? 'thumb_down' : 'thumb_up'}</FontIcon>}
      />
    );
  }

  onSave(event){
    event.preventDefault();
    const contentState = this.state.editorState.getCurrentContent();
    // console.log('content state', JSON.stringify(convertToRaw(contentState)));
    // console.log("props", this.props);
    axios.post(`http://localhost:3000/save${this.props.location.pathname}`, {content: JSON.stringify(convertToRaw(contentState))}, {withCredentials: true})
    .then(function (response) {
      console.log('SAVE RESPONSE', response);
    })
    .catch(function (error) {
      console.log("SAVE error", error);
    });
  }


  render() {
    return (
      <div>
        <div>The URL is {this.props.match.url}</div>
        <div>The author is {this.state.author}</div>
        <div>
          The collaborators are
          <ul>
            {this.state.collaborators.map((elem) => <li>{elem}</li>)}
          </ul>
        </div>
        <div>This is the document {this.state.docName}</div>
        <AppBar title="HDOCS"/>
        <div className="toolbar">
          {this.formatButton({icon: 'format_bold', style: 'BOLD'})}
          {this.formatButton({icon: 'format_italic', style: 'ITALIC'})}
          {this.formatButton({icon: 'format_underlined', style: 'UNDERLINE'})}
          {this.colorPicker()}
          {this.formatButton({icon: 'format_list_numbered', style: 'ordered-list-item', block: true})}
          {this.formatButton({icon: 'format_list_bulleted', style: 'unordered-list-item', block: true})}
          {this.formatButton({icon: 'format_align_left', style: 'unstyled', block: true})}
          {this.formatButton({icon: 'format_align_center', style: 'center', block: true})}
          {this.formatButton({icon: 'format_align_right', style: 'right', block: true})}
          {this.increaseFontSize(false)}
          {this.increaseFontSize(true)}
        </div>
        <button onClick={(event) => this.onSave(event)}>Save</button>
        <Editor
          onChange={this.onChange.bind(this)}
          editorState={this.state.editorState}
          blockRenderMap={myBlockTypes}
          customStyleMap={this.state.inlineStyles}
        />
      </div>
    );
  }
}


export default Main;
