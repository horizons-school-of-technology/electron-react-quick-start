import React from 'react';
import { Link } from 'react-router-dom';
import { ContentState, convertFromRaw, convertToRaw, Editor, EditorState, RichUtils, getDefaultKeyBinding, KeyBindingUtil, Modifier } from 'draft-js';
const {hasCommandModifier} = KeyBindingUtil;
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';
import alignStyleMap from './customMaps/alignStyleMap';
import colorStyleMap from './customMaps/colorStyleMap';
import sizeStyleMap from './customMaps/sizeStyleMap';
import fontStyleMap from './customMaps/fontStyleMap';
import customStyleMap from './customMaps/customStyleMap';
import AlignmentControls from './AlignmentControls';
import ColorControls from './ColorControls';
import SizeControls from './SizeControls';
import FontControls from './FontControls';
import styles from '../../assets/stylesheets/textEditor.scss';
import axios from 'axios';
import io from 'socket.io-client';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // socket: io('http://localhost:3000/')
    };

    //when something in the editor changes
    // this.onChange = (editorState) => {
    //   console.log('ON CHANGE');
    //   this.setState({editorState: editorState});
    //   const rawCS= convertToRaw(this.props.editorState.getCurrentContent());
    //   const strCS = JSON.stringify(rawCS);
    //   this.state.socket.emit("sendContentState", strCS);
    // };

    //when the editor is selected/in focus - default by draft
    this.focus = () => this.refs.editor.focus();
  }

  componentDidMount() {
    console.log('TEXT EDITOR MOUNTING');
  }
  //
  // componentDidMount() {
  //   // this.props.socket.emit('started', 'hello world!');
  //   //GET MOST RECENT FROM DOC DB
  //   console.log("PROPS", this.props);
  //   var self = this;
  //   //Axios call to get the document
  //   axios.get('http://localhost:3000/docs/' + this.props.id)
  //   .then(({ data }) => {
  //     if (data.success) {
  //       console.log("DATA DOC", data.doc);
  //       var newState;
  //       if (data.doc.text) {
  //         const rawCS =  JSON.parse(data.doc.text);
  //         const contentState = convertFromRaw(rawCS);
  //         newState = EditorState.createWithContent(contentState);
  //       }
  //       else {
  //         newState = EditorState.createEmpty();
  //       }
  //       self.setState({editorState: newState});
  //     }
  //     else {
  //       console.log("ERROR LOADING");
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  //
  //   this.state.socket.on('connect', () => {
  //     console.log('CONNECTED TO SOCKETS');
  //     this.state.socket.emit("documentId", this.props.id);
  //   });
  //   this.state.socket.on('errorMessage', message => {
  //     console.log("ERROR", message);
  //   });
  //   this.state.socket.on('sendBackContentState', socketStr => {
  //     const socketRaw =  JSON.parse(socketStr);
  //     const socketCS = convertFromRaw(socketRaw);
  //     const socketState = EditorState.createWithContent(socketCS);
  //     self.setState({editorState: socketState});
  //   });
  //
  // }

  componentWillUnMount() {
    this.state.socket.disconnect();
  }

  // onSave(e) {
  //   e.preventDefault();
  //   const rawCS= convertToRaw(this.state.editorState.getCurrentContent());
  //   const strCS = JSON.stringify(rawCS);
  //   axios.post('http://localhost:3000/docs/save/' + this.props.id, {
  //     text: strCS
  //   })
  //   .then(resp => {
  //     console.log(resp);
  //     // this.setState({saveFlag: true});
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // }

  //recieves all keyDown events.
  //helps us define custom key bindings
  //return a command(string) that should be executed depending on keyDown
  keyBindingFn(e) {
    //command + s
    if (KeyBindingUtil.hasCommandModifier(e) && e.keyCode === 83) {
      return "SAVE";
    }
    return getDefaultKeyBinding(e);
  }

  //recieve all commands from key bindings and applies changes
  handleKeyCommand(command) {
    if (command === "SAVE") {
      const rawCS= convertToRaw(this.props.editorState.getCurrentContent());
      const strCS = JSON.stringify(rawCS);
      axios.post('http://localhost:3000/docs/save/' + this.props.id, {
        text: strCS
      })
      .then(resp => {
        console.log(resp);
        // this.setState({saveFlag: true});
        // console.log("SAVING");
        // this.setState({saveFlag: true}, function () {
        //   console.log('state in handle', this.state);
        // });
        return true;
      })
      .catch(err => {
        console.log(err);
      });
    }
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  // onBack(e) {
  //   //e.preventDefault();
  //   this.setState({buttonClicked: true});
  //   console.log('state in back', this.state);
  //   // if (this.state.saveFlag && this.state.buttonClicked) {
  //   this.props.history.push('/user/' + this.props.id);
  //   // }
  //   // else {
  //   //   alert("You haven't saved your changes yet");
  //   // }
  // }

  //on tab event
  onTab(e) {
    const depth = 4;
    this.onChange(RichUtils.onTab(e, this.props.editorState, depth));
  }

  //toggles block type
  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.props.editorState,
        blockType
      )
    );
  }

  //toggles inline styles
  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.props.editorState,
        inlineStyle
      )
    );
  }

  toggleAlign(toggledAlignment) {
    const {editorState} = this.props;
    const selection = editorState.getSelection();
    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(alignStyleMap)
      .reduce((contentState, alignment) => {
        return Modifier.removeInlineStyle(contentState, selection, alignment);
      }, editorState.getCurrentContent());
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );
    const currentStyle = editorState.getCurrentInlineStyle();
    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, alignment) => {
        return RichUtils.toggleInlineStyle(state, alignment);
      }, nextEditorState);
    }
    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledAlignment)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledAlignment
      );
    }
    this.onChange(nextEditorState);
  }

  toggleColor(toggledColor) {
    console.log('color', colorStyleMap);
    const {editorState} = this.props;
    const selection = editorState.getSelection();
    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap)
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color);
      }, editorState.getCurrentContent());
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );
    const currentStyle = editorState.getCurrentInlineStyle();
    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }
    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }
    this.onChange(nextEditorState);
  }

  toggleSize(toggledSize) {
    const {editorState} = this.props;
    const selection = editorState.getSelection();
    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(sizeStyleMap)
      .reduce((contentState, size) => {
        return Modifier.removeInlineStyle(contentState, selection, size);
      }, editorState.getCurrentContent());
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );
    const currentStyle = editorState.getCurrentInlineStyle();
    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, size) => {
        return RichUtils.toggleInlineStyle(state, size);
      }, nextEditorState);
    }
    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledSize)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledSize
      );
    }
    this.onChange(nextEditorState);
  }

  toggleFont(toggledFont) {
    const {editorState} = this.props;
    const selection = editorState.getSelection();
    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(fontStyleMap)
      .reduce((contentState, font) => {
        return Modifier.removeInlineStyle(contentState, selection, font);
      }, editorState.getCurrentContent());
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );
    const currentStyle = editorState.getCurrentInlineStyle();
    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, font) => {
        return RichUtils.toggleInlineStyle(state, font);
      }, nextEditorState);
    }
    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledFont)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledFont
      );
    }
    this.onChange(nextEditorState);
  }

  render() {
    console.log('props', this.props);
    return (
      // <div>
        // {/* <div> */}
          // {/* <button
          //   className="waves-effect waves-light btn col s5"
          //   onClick={(e) => this.onBack(e)}>
          //   <i className="material-icons left">chevron_left</i>
          //   Back to Document Portal
          // </button> */}
        // {/* </div> */}
      // {/* <div> */}
        // {/* <button
        //   onClick={(e) => this.onSave(e)}
        //   className="btn waves-effect waves-light col s4 offset-s4">
        //   Save Changes
        //   <i className="material-icons left">save</i>
        // </button> */}
        // {/* <div>
        //   <button
        //     className="waves-effect waves-light btn col s5"
        //     onClick={(e) => this.onBack(e)}>
        //     <i className="material-icons left">chevron_left</i>
        //     Back to Document Portal
        //   </button>
        // </div> */}
        // {/* <div> */}
        <div className="editorRoot">
          <InlineStyleControls
            editorState={this.props.editorState}
            onToggle={this.toggleInlineStyle.bind(this)}
          />
          <AlignmentControls
            editorState={this.props.editorState}
            onToggle={this.toggleAlign.bind(this)}
          />
          <BlockStyleControls
            editorState={this.props.editorState}
            onToggle={this.toggleBlockType.bind(this)}
          />
          <ColorControls
            editorState={this.props.editorState}
            onToggle={this.toggleColor.bind(this)}
          />
          <SizeControls
            editorState={this.props.editorState}
            onToggle={this.toggleSize.bind(this)}
          />
          <FontControls
            editorState={this.props.editorState}
            onToggle={this.toggleSize.bind(this)}
          />
          <div className="editor" onClick={this.focus}>
            <Editor
              handleKeyCommand={this.handleKeyCommand.bind(this)}
              customStyleMap={customStyleMap}
              keyBindingFn={this.keyBindingFn.bind(this)}
              editorState={this.props.editorState}
              onChange={this.props.onChange.bind(this)}
              onTab={this.onTab.bind(this)}
              ref="editor"
            />
          </div>
        </div>
  //     </div>
  //   </div>
  // </div>
    );
  }
}

export default TextEditor;
