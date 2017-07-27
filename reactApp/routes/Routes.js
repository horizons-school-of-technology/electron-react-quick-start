import React from 'react';
import {Route, Link} from 'react-router-dom';
import DocumentPortal from '../components/DocumentPortal';
import EditorView from '../components/EditorView';

const Routes = () => (
  <div>
    <ul>
      <li><Link to='/documents'>Documents</Link></li>
      <li><Link to='/editor'>Editor</Link></li>
    </ul>
      <Route path='/documents' component={DocumentPortal}/>
      <Route path='/editor' component={EditorView}/>
  </div>
);

export default Routes;
