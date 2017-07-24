import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';
import styles from '../styles/styles';

const styleMap ={
  'STRIKETHROUGH': styles.strikethrough,
  'FONT_RED': styles.fontRed,
};

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  makeBold() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'BOLD'
    ));
  }
  makeItalic() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'ITALIC'
    ));
  }
  makeUnderline() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'UNDERLINE'
    ));
  }
  makeCode() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'CODE'
    ));
  }
  makeStrikethrough() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'STRIKETHROUGH'
    ));
  }
  makeFontRed() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'FONT_RED'
    ));
  }
  render() {
    return (
      <div>
        <h1 style={styles.title}>Docs Editor</h1>
        <div style={styles.allButTitle}>
          <div style={styles.toolbar}>
            <button style={styles.buttonflat} onClick={() => this.makeBold()}>
              <i className="fa fa-bold" aria-hidden="true"></i>
            </button>
            <button style={styles.buttonflat} onClick={() => this.makeItalic()}>
              <i className="fa fa-italic" aria-hidden="true"></i>
            </button>
            <button style={styles.buttonflat} onClick={() => this.makeUnderline()}>
              <i className="fa fa-underline" aria-hidden="true"></i>
            </button>
            <button style={styles.buttonflat} onClick={() => this.makeCode()}>
              <i className="fa fa-code" aria-hidden="true"></i>
            </button>
            <button style={styles.buttonflat} onClick={() => this.makeStrikethrough()}>
              <i className="fa fa-strikethrough" aria-hidden="true"></i>
            </button>
            <button style={styles.buttonflatR} onClick={() => this.makeFontRed()}>
              <i className="fa fa-paint-brush" aria-hidden="true"></i>
            </button>
          </div>
        </div>
            <Editor
              style={styles.editor}
              editorState={this.state.editorState} onChange={this.onChange}
              customStyleMap={styleMap}
            />
          {/* just for debugging purposes */}
          {JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))}

      </div>
    );
  }
}

export default TextEditor;
