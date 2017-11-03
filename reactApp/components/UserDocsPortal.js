import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class UserDocsPortal extends React.Component {
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
      this.setState({docs: this.state.docs.concat(resp.data.doc)})
    })
  }

  componentWillMount() {
    axios.get('http://localhost:3000/getmydocs')
    .then((resp) => {
      this.setState({docs: this.state.docs.concat(resp.data.docs)})
    });
  }

  render() {
    return (
      <div>
        {/* <button onClick={() => }>Back</button> */}
        <h2>Documents Portal</h2> <Link style={{float: 'right'}} to='/login'>Go To login</Link>
        <div style={{clear: 'both'}}>
          <input type="text" placeholder="New Doc" ref="newdoc" />
          <button onClick={() => this.newDoc()}>Create Document</button>
          <br />
          <div className="boxed">
            <p style={{marginLeft:"10px"}}>My Documents:</p>
            <ul>
              {this.state.docs.map((doc) => <div key={doc._id.toString()}><Link to={`/edit/${doc._id}`}>{doc.name}</Link></div>)}
            </ul>
          </div>
          <br />
          <input style={{width:'30%'}}type="text" placeholder="paste a docID to collab on a doc" ref="sharedDoc" />
          <button>Add Shared Doc</button>
        </div>
      </div>
    )
  }
}

export default UserDocsPortal;
