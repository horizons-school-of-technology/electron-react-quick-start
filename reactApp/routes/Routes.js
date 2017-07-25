import React from 'react';
import { Route} from 'react-router-dom';
import Test from '../components/Test';
import DocumentPortal from '../components/DocumentPortal';
import EditorView from '../components/EditorView';

const Routes = () => (
  <main>

      <Route exact path='/' component={Test}/>
      <Route path='/documents' component={DocumentPortal}/>
      <Route path='/editor' component={EditorView}/>

  </main>
);

export default Routes;
