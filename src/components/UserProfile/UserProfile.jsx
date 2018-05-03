import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';
import axios from "axios/index";
import server from '../../config.json';

class UserProfile extends Component {
  logout(e) {
    e.preventDefault();

    axios.post('http://' + server.address + ':' + server.port + '/shop/logout/')
      .then(function (response) {
        if (response) {        
          this.props.changeView(0);
          this.props.setUser(null);
        } else {
          alert("No fue possible hacer el logout");
        }
      }.bind(this))
      .catch(function (error) {
          alert("Falla en la solicitud");
      });
  }

  handleClick(e, view){
    e.preventDefault();
    this.props.changeView(view);
  }

  render() {
    return (
      <div className="container">
        <h2>{this.props.user.nombre + " " + this.props.user.apellido}</h2>
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col">
              <FontAwesomeIcon icon={faUser} size="10x"/>
            </div>
            <div className="col">
              <div className="info-box">
                <p>Información general del usuario</p>
              </div>
            </div>
          </div>
          <br/>
          <br/>
          <div className="row justify-content-between">
            <div className="col-sm-6"><button type="button" className="btn btn-primary">Subir foto</button></div>
            <div className="col-sm-4"><button type="button" className="btn btn-primary" onClick={e => this.handleClick(e, 10)}>Historial de compras</button>&nbsp;<button type="button" className="btn btn-primary">Editar información</button></div>
          </div>
          <br/>
          <div className="row justify-content-end">
            <div className="col-sm-1">
              <button type="button" className="btn btn-outline-danger" onClick={e => this.logout(e)}>Salir</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
