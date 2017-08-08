var React = require('react');
import {Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap, Modifier} from 'draft-js';
import Immutable from 'immutable';
import Toolbar from './toolbar';

// text align
const blockRenderMap = Immutable.Map({
  'ALIGN_LEFT': {
    wrapper: <div className='left' />
  },
  'ALIGN_CENTER': {
    wrapper: <div className='center' />
  },
  'ALIGN_RIGHT': {
    wrapper: <div className='right' />
  }
})
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

// This object provides the styling information for our custom color
// styles.
const colorStyleMap = {
  red: {
    color: 'rgba(255, 0, 0, 1.0)',
  },
  orange: {
    color: 'rgba(255, 127, 0, 1.0)',
  },
  yellow: {
    color: 'rgba(180, 180, 0, 1.0)',
  },
  green: {
    color: 'rgba(0, 180, 0, 1.0)',
  },
  blue: {
    color: 'rgba(0, 0, 255, 1.0)',
  },
  indigo: {
    color: 'rgba(75, 0, 130, 1.0)',
  },
  violet: {
    color: 'rgba(127, 0, 255, 1.0)',
  },
};

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onInlineStyleClick = this.onInlineStyleClick.bind(this);
    this.onBlockStyleClick = this.onBlockStyleClick.bind(this);
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  onInlineStyleClick(style) {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      style
    ));
  }

  onBlockStyleClick(style) {
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      style
    ));
  }

  render() {
    return (
      <div id="content">
        <h1>Editor</h1>
        <Toolbar
          onInlineStyleClick={this.onInlineStyleClick}
          onBlockStyleClick={this.onBlockStyleClick}
         />
        <div className="editor">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            blockRenderMap={extendedBlockRenderMap}
            customStyleMap={colorStyleMap}
          />
        </div>
      </div>
    );
  }
}


export default MyEditor;
