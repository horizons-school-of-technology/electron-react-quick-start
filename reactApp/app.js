var React = require('react');
var ReactDOM = require('react-dom');
var { Editor, EditorState, RichUtils } = require('draft-js');
const {styleMap} = require('./styleMap');
console.log('styleMap: ', styleMap);
/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})

class DocContainer extends React.Component {
  render(){
    return (
            <div>
                <Static docName="Doc" docId="34344"/>
                <MyEditor/>
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
    this.state = {editorState: EditorState.createEmpty(), size: 12};
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
    var colorArr = color.split('');
    colorArr[0] = colorArr[0].toUpperCase();
    color = colorArr.join('');
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, `text${color}`));
  }

  _onBackgroundColorSelect(){
    var color = document.getElementById('backgroundColorSelect').value;
    var colorArr = color.split('');
    colorArr[0] = colorArr[0].toUpperCase();
    color = colorArr.join('');
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, `background${color}`));
  }
  _onStrikethroughClick(){
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'STRIKETHROUGH'));
  }
  _onSizeSelect(){
    let size = document.getElementById('slider1').value;
    this.setState({
      size
    })
    switch (parseInt(this.state.size)) {
      case 12:
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'fontSize12'));
        break;
      case 24:
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'fontSize24'));
        break;
      case 36:
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'fontSize36'));
        break;
      case 48:
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'fontSize48'));
        break;
      case 60:
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'fontSize60'));
        break;
      case 72:
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'fontSize72'));
        break;
      case 84:
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'fontSize84'));
        break;
      case 96:
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'fontSize96'));
        break;
      case 108:
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'fontSize108'));
        break;
      default:
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'fontSize24'));
        break;
    }
  }

  _onBulletedClick(){
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        'unordered-list-item'
      )
    );
  }

  _onOrderedClick(){
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'ordered-list-item'));
  }

  _onLeftJustify(){
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'ordered-list-item'));
  }

  _onLeftJustify(){
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'ordered-list-item'));
  }

  _onLeftJustify(){
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'ordered-list-item'));
  }

  myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'leftJustify') {
    return this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'leftJustify'));
  }  else if(type === 'rightJustify'){
    return this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'rightJustify'));
  }  else {
    return this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'centerJustify'));
  }
}

  render() {
    return (
        <div>
            <div>
                <div style={{display: 'flex'}}>
                  <div style={{flex: 1}}>
                    <input id="slider1" type="range" min="12" max="108" step="12" defaultValue="12" onChange={this._onSizeSelect.bind(this)}/>
                    <div style={{width: 80}}>
                      Size: {this.state.size}
                    </div>
                  </div>
                 <select className='dropdown-button btn' href='#' style={{margin: 5}}>
                   <option>-font-</option>
                   <option>Cambria</option>
                   <option>Arial</option>
                   <option>Ayuthaya</option>
                   <option>Marker Felt</option>
                   <option>Lucida Fax</option>
                   <option>Avenir Black</option>
                   <option>Beirut</option>
                </select>

               <select id='colorSelect' className='dropdown-button btn' href='#' style={{margin: 5}} onChange={this._onColorSelect.bind(this)}>
                 <option>-color-</option>
                 <option value="red">red</option>
                 <option value="blue">blue</option>
                 <option value="green">green</option>
                 <option value="yellow">yellow</option>
              </select>

              <select id='backgroundColorSelect' className='dropdown-button btn' href='#' style={{margin: 5}} onChange={this._onBackgroundColorSelect.bind(this)}>
                <option>-background-</option>
                <option value="red">red</option>
                <option value="blue">blue</option>
                <option value="green">green</option>
                <option value="yellow">yellow</option>
             </select>
             </div>
             <div style={{display: 'flex', justifyContent: 'space-around'}}>
                 <a className="waves-effect waves-teal btn-flat" onClick={this._onBoldClick.bind(this)}><i className="material-icons">format_bold</i></a>
                 <a className="waves-effect waves-teal btn-flat" onClick={this._onItalicClick.bind(this)}><i className="material-icons">format_italic</i></a>
                 <a className="waves-effect waves-teal btn-flat" onClick={this._onUnderLineClick.bind(this)}><i className="material-icons">format_underlined</i></a>
                 <a className="waves-effect waves-teal btn-flat" onClick={this.myBlockStyleFn.bind(this)}><i className="material-icons">format_align_left</i></a>
                 <a className="waves-effect waves-teal btn-flat" onClick={this.myBlockStyleFn.bind(this)}><i className="material-icons">format_align_center</i></a>
                 <a className="waves-effect waves-teal btn-flat" onClick={this.myBlockStyleFn.bind(this)}><i className="material-icons">format_align_right</i></a>
                 {/* doesn't work because of materialize css padding <a className="waves-effect waves-teal btn-flat"><i className="material-icons" onClick={this._onBulletedClick.bind(this)}>format_list_bulleted</i></a> */}
                 <a className="waves-effect waves-teal btn-flat"><i className="material-icons" onClick={this._onOrderedClick.bind(this)}>format_list_numbered</i></a>
                 <a className="waves-effect waves-teal btn-flat" onClick={this._onStrikethroughClick.bind(this)}><i className="material-icons">format_strikethrough</i></a>
             </div>
         </div>
            <div style={{border: "1px solid gray", minHeight: 300, margin: 20}}>
                <Editor blockStyleFn={() => this.myBlockStyleFn.bind(this)} customStyleMap={styleMap} editorState={this.state.editorState} handleKeyCommand={this.handleKeyCommand} onChange={this.onChange}/>
            </div>
        </div>
    );
  }
}

ReactDOM.render(
 <DocContainer />,
 document.getElementById('root')
);
