import React, { Component } from 'react';
import axios from "axios/index";

class LoginScreen extends Component {
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
        } else {
          alert("No fue possible hacer el login: " + response.data.error);
        }
      }.bind(this))
      .catch(function (error) {
          alert("Falla en la solicitud");
      });
  }

  render(){
    return(
      <div className="container">
        <div id="bModal" style={{ display : 'none' }}></div>
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-6">
            <h2>Entrar</h2>
            <form onSubmit={e => this.handleSubmit(e)}>
              <div className="form-group">
                <label htmlFor="formEmail">Email</label>
                <input type="email" className="form-control" id="formEmail" aria-describedby="emailHelp" placeholder="Email" ref={(input) => this.email = input} />
              </div>
              <div className="form-group">
                <label htmlFor="formContrasena">Contraseña</label>
                <input type="password" className="form-control" id="formContrasena" placeholder="Contraseña" ref={(input) => this.contrasena = input} />
              </div>
              <button type="submit" className="btn btn-primary">Entrar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginScreen;
