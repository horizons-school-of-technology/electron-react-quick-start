var React = require('react');
var ReactDOM = require('react-dom');
var { Editor, EditorState } = require('draft-js');

/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})

   class MyEditor extends React.Component {
     constructor(props) {
       super(props);
       this.state = {editorState: EditorState.createEmpty()};
       this.onChange = (editorState) => this.setState({editorState});
     }
     render() {
       return (
           <div>
               <Editor editorState={this.state.editorState} onChange={this.onChange} />
           </div>
       );
     }
   }

   ReactDOM.render(
     <MyEditor />,
     document.getElementById('root')
   );
