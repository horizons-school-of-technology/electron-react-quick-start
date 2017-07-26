import  React from 'react';
import Modal from 'boron/ScaleModal';


class DocPwModal extends React.Component {

  showModal() {
    this.refs.modal.show();
  }

  hideModal() {
    this.refs.modal.hide();
  }

  render(){
    return(
      <div>
        <button onClick={this.showModal}>Open</button>
        <Modal ref="modal">
          <h2>I am a modal</h2>
          <button onClick={this.hideModal}>Close</button>
        </Modal>
      </div>
    );
  }
}

export default DocPwModal;
