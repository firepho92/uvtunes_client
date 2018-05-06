import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ReactstrapModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: "static",
      content: this.props.content,
      title: this.props.title,
      showFooter: this.props.showFooter,
      button: {
        action: this.props.button.action,
        text: this.props.button.text
      }
    };

    this.toggle = this.toggle.bind(this);
    this.getVisibility = this.getVisibility.bind(this);
    this.setButton = this.setButton.bind(this);
    this.setContent = this.setContent.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setFooterVisibility = this.setFooterVisibility.bind(this);
  }

  getVisibility() {
    return this.state.modal;
  }

  setButton(button) {
    this.setState({
      button: {
        action: button.action,
        text: button.text
      }
    });
  }

  setContent(content) {
    this.setState({
      content: content
    })
  }

  setTitle(title) {
    this.setState({
      title: title
    })
  }

  setFooterVisibility(visibility) {
    this.setState({
      showFooter: visibility
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const modalFooter = (this.state.showFooter ? 
                          <ModalFooter>
                            <Button color="primary" onClick={this.state.button.action}>{this.state.button.text}</Button>
                          </ModalFooter> : "");
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop}>
          <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
          <ModalBody>
            {this.state.content}
          </ModalBody>
          { modalFooter }
        </Modal>
      </div>
    );
  }
}

export default ReactstrapModal;