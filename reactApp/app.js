var React = require('react');
var ReactDOM = require('react-dom');
var { Editor, EditorState, RichUtils } = require('draft-js');

/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})

const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
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

class DocContainer extends React.Component {
  render(){
    return (
            <div>
                <Static docName="Doc" docId="34344"/>
                <MyEditor />
            </div>
    );
  }
}

class Static extends React.Component {
  render(){
    return (
            <div style={{display: "flex", justifyContent: 'space-around', alignItems: 'center'}}>
                <a className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">keyboard_return</i></a>
                <div><h3><b>{this.props.docName}</b></h3>
                <p>ID: {this.props.docId}</p></div>
                <a className="btn-floating btn-large waves-effect waves-light blue"><i className="material-icons">save</i></a>
            </div>
    );
  }
}

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onItalicClick(){
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  _onUnderLineClick(){
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  _onColorSelect(){
    var color = document.getElementById('colorSelect').value;
    console.log(color);
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, color));
  }

  _onStrikethroughClick(){
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'STRIKETHROUGH'));
  }

  render() {
    return (
        <div>
            <div>
                <div style={{display: 'flex'}}>
                 <select className='dropdown-button btn' href='#' style={{margin: 5}}>
                   <option>-font-</option>
                   <option>two</option>
                   <option>three</option>
                   <option>four</option>
                   <option>five</option>
                </select>

                <select className='dropdown-button btn' href='#' style={{margin: 5}}>
                  <option>-size-</option>
                  <option>two</option>
                  <option>three</option>
                  <option>four</option>
                  <option>five</option>
               </select>

               <select id='colorSelect' className='dropdown-button btn' href='#' style={{margin: 5}} onChange={this._onColorSelect.bind(this)}>
                 <option>-color-</option>
                 <option value="red">red</option>
                 <option value="blue">blue</option>
                 <option value="green">green</option>
                 <option value="yellow">yellow</option>
              </select>

              <select className='dropdown-button btn' href='#' style={{margin: 5}}>
                <option>-background-</option>
                <option>two</option>
                <option>three</option>
                <option>four</option>
                <option>five</option>
             </select>
             </div>
             <div style={{display: 'flex', justifyContent: 'space-around'}}>
                 <a className="waves-effect waves-teal btn-flat" onClick={this._onBoldClick.bind(this)}><i className="material-icons">format_bold</i></a>
                 <a className="waves-effect waves-teal btn-flat" onClick={this._onItalicClick.bind(this)}><i className="material-icons">format_italic</i></a>
                 <a className="waves-effect waves-teal btn-flat" onClick={this._onUnderLineClick.bind(this)}><i className="material-icons">format_underlined</i></a>
                 <a className="waves-effect waves-teal btn-flat" ><i className="material-icons">format_align_center</i></a>
                 <a className="waves-effect waves-teal btn-flat"><i className="material-icons">format_align_justify</i></a>
                 <a className="waves-effect waves-teal btn-flat"><i className="material-icons">format_align_left</i></a>
                 <a className="waves-effect waves-teal btn-flat"><i className="material-icons">format_align_right</i></a>
                 <a className="waves-effect waves-teal btn-flat"><i className="material-icons">format_list_bulleted</i></a>
                 <a className="waves-effect waves-teal btn-flat"><i className="material-icons">format_list_numbered</i></a>
                 <a className="waves-effect waves-teal btn-flat" onClick={this._onStrikethroughClick.bind(this)}><i className="material-icons">format_strikethrough</i></a>
             </div>
         </div>
            <div style={{border: "1px solid gray", minHeight: 300, margin: 20}}>
                <Editor customStyleMap={styleMap} editorState={this.state.editorState} onChange={this.onChange} handleKeyCommand={this.handleKeyCommand} onChange={this.onChange}/>
            </div>
        </div>
    );
  }
}

ReactDOM.render(
 <DocContainer />,
 document.getElementById('root')
);
