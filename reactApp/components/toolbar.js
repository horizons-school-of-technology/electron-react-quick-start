var React = require('react');

class TextToolBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button>BOLD</button>
        <button>ITALICS</button>
        <button>CUSTOM</button>
      </div>
    );
  }
}




export default TextToolBox;
