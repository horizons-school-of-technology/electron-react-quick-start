import React from 'react';
<<<<<<< HEAD
import EditorView from './EditorView.js';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {
      return (
          <EditorView />
      );
    }
}
=======
import EditorContainer from '../containers/EditorContainer.js';

const App = () => {
  return (
      <EditorContainer />
  );
};
>>>>>>> f7d720580d9b03d191276f69dbd7b07e3614c1d6

export default App;
