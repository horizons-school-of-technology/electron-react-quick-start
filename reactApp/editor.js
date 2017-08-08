var React = require('react');
import {Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap} from 'draft-js';
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
});
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

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
          />
        </div>
      </div>
    );
  }
}

export default MyEditor;
