var React = require('react');

class ColorDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  onMouseDownHandler(e, color) {
    e.preventDefault();
    this.props.colorPick(color);
  }

  render() {
    var divStyle = {
      display: 'inline-block'
    };
    return (
      <div style={divStyle}>
        <a className='dropdown-button btn' href='#' data-activates='dropdown2' onMouseDown={(e) => e.preventDefault()} >Font Color</a>
          <ul id='dropdown2' className='dropdown-content'>
          {COLORS.map(colorObj =>
            <li key={colorObj.label}>
              <a href='#!' onMouseDown={(e) => this.onMouseDownHandler(e, colorObj.label)}>
                {colorObj.label}
              </a>
            </li>
          )}
        </ul>

      </div>
    );
  }
}

const COLORS = [
       {label: 'red', style: 'red'},
       {label: 'orange', style: 'orange'},
       {label: 'yellow', style: 'yellow'},
       {label: 'green', style: 'green'},
       {label: 'blue', style: 'blue'},
       {label: 'indigo', style: 'indigo'},
       {label: 'violet', style: 'violet'},
];

export default ColorDropdown;
