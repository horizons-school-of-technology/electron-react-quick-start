var React = require('react');

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <i onClick={() => this.props.onInlineStyleClick('BOLD')} className="material-icons small">format_bold</i>
        <i onClick={() => this.props.onInlineStyleClick('ITALIC')} className="material-icons small">format_italic</i>
        <i onClick={() => this.props.onInlineStyleClick('UNDERLINE')} className="material-icons small">format_underlined</i>
        <i onClick={() => this.props.onBlockStyleClick('ALIGN_LEFT')} className="material-icons small">format_align_left</i>
        <i onClick={() => this.props.onBlockStyleClick('ALIGN_CENTER')} className="material-icons small">format_align_center</i>
        <i onClick={() => this.props.onBlockStyleClick('ALIGN_RIGHT')} className="material-icons small">format_align_right</i>
        <i onClick={() => this.props.onBlockStyleClick('unordered-list-item')} className="material-icons small">format_list_bulleted</i>
        <i onClick={() => this.props.onBlockStyleClick('ordered-list-item')} className="material-icons small">format_list_numbered</i>
      </div>
    )
  }
}

export default Toolbar;
