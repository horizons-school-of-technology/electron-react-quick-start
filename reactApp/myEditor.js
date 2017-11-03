import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap} from 'draft-js';
import Button from 'material-ui/Button';
import { Map } from 'immutable';


class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }


  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  _onUnderlineClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  _onRedClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'RED'));
  }

  _onBlueClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BLUE'));
  }

  _onSmallClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'SMALL'));
  }

  _onMediumClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'MEDIUM'));
  }

  _onLargeClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'LARGE'));
  }

  _onOrderedClick() {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'ordered-list-item'));
  }

  _onUnorderedClick() {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item'));
  }

  _onLeftClick() {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'unstyled'));
  }

  _onCenterClick() {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'center'));
  }

  _onRightClick() {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'right'));
  }


  render() {
    return (
      <div>
        <Button onClick={this._onBoldClick.bind(this)}>Bold!</Button>
        <Button onClick={this._onItalicClick.bind(this)}>Italic!</Button>
        <Button onClick={this._onUnderlineClick.bind(this)}>Underline!</Button>
        <Button onClick={this._onRedClick.bind(this)}>Red!</Button>
        <Button onClick={this._onBlueClick.bind(this)}>Blue!</Button>
        <Button onClick={this._onSmallClick.bind(this)}>Small!</Button>
        <Button onClick={this._onMediumClick.bind(this)}>Medium!</Button>
        <Button onClick={this._onLargeClick.bind(this)}>Large!</Button>
        <Button onClick={this._onOrderedClick.bind(this)}>Ordered List!</Button>
        <Button onClick={this._onUnorderedClick.bind(this)}>Unordered List!</Button>
        <Button onClick={this._onLeftClick.bind(this)}>Left!</Button>
        <Button onClick={this._onCenterClick.bind(this)}>Center!</Button>
        <Button onClick={this._onRightClick.bind(this)}>Right !</Button>
        <Editor
          customStyleMap={styleMap}
          blockRenderMap={myBlockTypes}
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />

      </div>
    );
  }
}

ReactDOM.render(
  <MyEditor />,
  document.getElementById('root')
);

const styleMap = {
  'RED': {
    color: 'red',
  },
  'BLUE': {
    color: 'blue',
  },
  'SMALL': {
    fontSize: 'small',
  },
  'MEDIUM': {
    fontSize: 'medium',
  },
  'LARGE': {
    fontSize: 'large',
  },
};

const myBlockTypes = DefaultDraftBlockRenderMap.merge(new Map({
  center: {
    wrapper: <div className="center-align"/>
  },
  right: {
    wrapper: <div className="right-align"/>
  }
}));

export default MyEditor;
