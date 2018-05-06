import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import axios from "axios/index";

class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      alert: {
        visible: false,
        message: "",
        type: "danger"
      }
    }
    this.setAlert = this.setAlert.bind(this);
  }

  setAlert(visible, message, type) {
    this.setState({
      alert: {
        visible: visible,
        message: message,
        type: type
      }
    })
  }

  handleSubmit(e){
    e.preventDefault();

    let data = {
      "email" : this.email.value,
      "contrasena" : this.contrasena.value
    }
    
    axios.post('https://uvtunes-backend.herokuapp.com/shop/login/', data)
      .then(function (response) {
        if (response.data.exito) {
          sessionStorage.setItem('user', JSON.stringify(response.data.registro));
          this.props.setUser(response.data.registro);
          this.props.changeView(0);
          
          if (window.location.search !== "") {       
              let search = window.location.search.substr(1);              
              let variables = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}');
              if (variables["success"] !== undefined) window.location.href = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
          }
        } else {
          this.setAlert(true, 
            <div>
              No fue possible hacer el login: {response.data.error}
            </div>, "danger");
        }
      }.bind(this))
      .catch(function (error) {
        this.setAlert(true, 
          <div>
            Falla en la solicitud
          </div>, "danger");
      }.bind(this));
  }

  render(){
    const alert = (this.state.alert.visible ?
                    <Alert color={this.state.alert.type}>
                     { this.state.alert.message }
                    </Alert> : "");
    return(
      <div className="container">
        <div id="bModal" style={{ display : 'none' }}></div>
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-6">
            <h2>Entrar</h2>
            <form onSubmit={e => this.handleSubmit(e)}>
              <div className="form-group">
                <label htmlFor="formEmail">Email</label>
                <input type="email" className="form-control" id="formEmail" aria-describedby="emailHelp" placeholder="Email" ref={(input) => this.email = input} pattern=".*\S+.*" required={true} maxLength="45" onKeyDown={() => this.setAlert(false, "")} />
              </div>
              <div className="form-group">
                <label htmlFor="formContrasena">Contraseña</label>
                <input type="password" className="form-control" id="formContrasena" placeholder="Contraseña" ref={(input) => this.contrasena = input} pattern=".*\S+.*" required={true} maxLength="20" onKeyDown={() => this.setAlert(false, "")} />
              </div>
              <button type="submit" className="btn btn-primary">Entrar</button><br /><br />
            </form>
            { alert }
          </div>
        </div>
      </div>
    );
  }
}

export default LoginScreen;
