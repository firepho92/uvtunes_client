import React, { Component } from 'react';
import "./Index.css"
import logo from '../../images/Logo.png';

class Index extends Component {

  handleClick(e, view){
    e.preventDefault();
    this.props.changeView(view)
  }

  render() {
    const button = (this.props.user === null ? 
                      <button type="button" className="btn btn-primary" onClick={e => this.handleClick(e, 4)}>Crea tu cuenta</button> :
                      <button type="button" className="btn btn-primary" onClick={e => this.handleClick(e, 9)}>Mi cuenta</button>);

    return (
      <div className="wrapper">
        <div className="row justify-content-center align-items-center wrapper">
          <div className="col">
            <img src={logo} alt="Logo uvTunes" id="logo" />
          </div>
          <div className="col">
            { button }
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
