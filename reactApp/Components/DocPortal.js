import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class DocPortal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      docs: []
    }
  }

  newDoc() {
    axios.post('http://localhost:3000/newDoc', {
      name: this.refs.newdoc.value
    })
    .then((resp) => {
      console.log(resp);
      this.setState({
        docs: this.state.docs.concat(resp.data.doc)
      });
    })
  }

  componentDidMount() {
    axios.get('http://localhost:3000/getmydocs')
    .then((resp) => {
      console.log(resp);
      this.setState({
        docs: this.state.docs.concat(resp.data.docs)
      });
    });
  }

  render() {
    return (
      <div>
        <h3>Doc Portal</h3>
        <input placeholder="New Doc" type="text" ref="newdoc" />
        <button onClick={() => this.newDoc()}>Make New Doc</button>
        {this.state.docs.map((doc) => <div key={doc._id}><Link to={`/edit/${doc._id}`} >{doc.name}</Link></div>)}
      </div>
    )
  }
}

export default DocPortal;
