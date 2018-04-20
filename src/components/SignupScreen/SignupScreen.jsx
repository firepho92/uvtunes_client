import React, { Component } from 'react';

class SignupScreen extends Component {

  handleSubmit(e){
    e.preventDefault();
    console.log("signedUp");
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-6">
            <h2>Crear cuenta</h2>
            <form onSubmit={e => this.handleSubmit(e)}>
              <div class="form-group">
                <label for="exampleNombre">Nombre(s)</label>
                <input type="text" className="form-control" id="exampleNombre" aria-describedby="nombreHelp" placeholder="Nombre(s)" />
              </div>
              <div class="form-group">
                <label for="exampleApellido">Apellidos</label>
                <input type="text" className="form-control" id="exampleApellido" aria-describedby="apellidoHelp" placeholder="Apellidos" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Contraseña</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Contraseña" />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword2">Verificar contraseña</label>
                <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Verficar contraseña" />
              </div>
              <button type="submit" className="btn btn-primary">Aceptar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupScreen;
