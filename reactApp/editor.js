var React = require('react');
import {Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap, Modifier} from 'draft-js';
import Immutable from 'immutable';
import Toolbar from './toolbar';
import axios from 'axios';
import Documents from './documents.js';
import HomePage from './homepage.js';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';

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

// This object provides the styling information for our custom color
// styles.
const customStyleMap = {
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
  small: {
    'fontSize': '50%'
  },
  medium: {
    'fontSize': '100%'
  },
  large: {
    'fontSize': '200%'
  }
};

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      name: "",
      id: "",
      redirect: false,
      logout: false,
      socket: io(),
      username: "",
    };
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onInlineStyleClick = this.onInlineStyleClick.bind(this);
    this.onBlockStyleClick = this.onBlockStyleClick.bind(this);
  }
  componentWillMount() {
    console.log('props', this.props.match.params.id);
    const formData = {id: this.props.match.params.id};
    axios.post('http:localhost:3000/getdoc', formData, { headers: {'Accept': 'application/json'} })
    .then((resp) => {
      this.setState({name: resp.data.name, id: resp.data.id, username: resp.data.username});
      if(resp.data.content !== "") {
        this.setState({editorState: resp.data.content});
      }
    });
  }

  componentDidMount(){

  }

  handleLogout() {
    axios.get('http:localhost:3000/logout')
    .then((resp) => {
      if(resp.data.success){
        console.log('log out successfully');
        this.setState({logout: true});
      }
    });
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

  goBack(e) {
    e.preventDefault();
    this.setState({redirect: true});
  }

  save() {
    console.log(this.state.editorState.getCurrentContent());
    const formData = {id: this.props.match.params.id, content: this.state.editorState};
    axios.post('http:localhost:3000/getdoc', formData, { headers: {'Accept': 'application/json'} })
    .then((resp) => {
      if(resp.data.success) {
        console.log('save success!');
        this.setState({redirect: true});
      }
    });
  }

  render() {
    if (this.state.redirect) {
      return (
        <BrowserRouter>
          <div>
            <Redirect to='/document'/>
            <Route path='/document' component={ Documents } />
          </div>
        </BrowserRouter>
      );
    }

    if(this.state.logout){
      return (
        <BrowserRouter>
          <div>
            <Redirect to='/homepage' />
            <Route path='/homepage' component={ HomePage } />
          </div>
        </BrowserRouter>
      );
    }

    return (
      <div id="content">
        <h3>{this.state.name}</h3> <p>id of this document: {this.state.id}</p>
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
            customStyleMap={customStyleMap}
          />
        </div>
        <button onClick={() => this.save()}>Save</button>
        <br />
        <button onClick={(e) => this.goBack(e)}>Go Back</button>
      </div>
    );
  }
}


export default MyEditor;
