var React = require('react');

class FontSizeDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  onMouseDownHandler(e, color) {
    e.preventDefault();
    this.props.fontPick(color);
  }

  render() {
    var divStyle = {
      display: 'inline-block'
    }
    return (
      <div style={divStyle}>
        <a className='dropdown-button btn' href='#' data-activates='dropdown1' onMouseDown={(e) => e.preventDefault()} style={divStyle} >Font Size</a>
          <ul id='dropdown1' className='dropdown-content'>
          {FONTS.map(sizeObj =>
            <li key={sizeObj.label}>
              <a href='#!' onMouseDown={(e) => this.onMouseDownHandler(e, sizeObj.label)}>
                {sizeObj.label}
              </a>
            </li>
          )}
        </ul>

      </div>
    );
  }
}

const FONTS = [
       {label: 'small'},
       {label: 'medium'},
       {label: 'large'},
     ];

export default FontSizeDropdown;
