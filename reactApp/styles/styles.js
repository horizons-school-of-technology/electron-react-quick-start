const styles = {
  content: {
    width: '480px',
    margin: '50px'
  },
  editor: {
    border: 'solid',
    color: 'red',
    margin: '60px',
    background: 'red'
  },
  button: {
    color: 'red',
  },
  strikethrough: {
    textDecoration: 'line-through'
  },
  title: {
    fontFamily: 'Alegreya',
    fontSize: '30px',
    color: '#4f4f4f',
    marginLeft: '30px'
  },
  toolbar: {
    marginLeft: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '30px',
    borderRadius: '2px',
    backgroundColor: '#f2f1ed',
    height: '40px',
    width: '90%'
  },
  buttonflat: {
    active: {
      top: '1px',
      outline: 'none',
      boxShadow: 'none',
    },
    position: 'relative',
    margin: '5px',
    verticalAlign: 'top',
    width: '25px',
    height: '25px',
    borderRadius: '3px',
    padding: '2',
    fontSize: '15px',
    color: 'white',
    textAlign: 'center',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
    background: '#f1c40f',
    border: '0',
    borderBottom: '2px solid #e2b607',
    boxShadow: 'inset 0 -2px #e2b607',
  },
  fontRed: {
    color: '#c62828'
  },
  buttonflatR: {
    active: {
      top: '1px',
      outline: 'none',
      boxShadow: 'none',
    },
    position: 'relative',
    margin: '5px',
    verticalAlign: 'top',
    width: '25px',
    height: '25px',
    borderRadius: '3px',
    padding: '2',
    fontSize: '15px',
    color: 'white',
    textAlign: 'center',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
    background: '#e53935',
    border: '0',
    borderBottom: '2px solid #c62828',
    boxShadow: 'inset 0 -2px #c62828',
  },
  allButTitle: {
    display: 'flex',
    flex: '1',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default styles;
