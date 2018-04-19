import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faHeadphones from '@fortawesome/fontawesome-free-solid/faHeadphones';
import "./Index.css"

class Index extends Component {

  handleClick(e, view){
    e.preventDefault();
    this.props.changeView(view)
  }

  render() {
    return (
      <div className="wrapper">
        <div className="row justify-content-center align-items-center wrapper">
          <div className="col">
            <FontAwesomeIcon icon={faHeadphones} size="10x"/>
          </div>
          <div className="col">
            <button type="button" className="btn btn-primary" onClick={e => this.handleClick(e, 4)}>Crea tu cuenta</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
