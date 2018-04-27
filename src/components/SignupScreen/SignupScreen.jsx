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
                <input type="text" className="form-control" id="exampleNombre" aria-describedby="nombreHelp" placeholder="Nombre(s)" ref={(input) => this.nombre = input}/>
              </div>
              <div class="form-group">
                <label for="exampleApellido">Apellidos</label>
                <input type="text" className="form-control" id="exampleApellido" aria-describedby="apellidoHelp" placeholder="Apellidos" ref={(input) => this.apellido = input}/>
              </div>
              <div className="form-group">
                  <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
                  <input type="text" className="form-control" id="fecha_nacimiento" aria-describedby="fecha_nacimiento" placeholder="Fecha de nacimiento" ref={(input) => this.fecha_nacimiento = input}/>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" ref={(input) => this.email = input}/>
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Contraseña</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Contraseña" ref={(input) => this.password = input}/>
              </div>
              <div className="form-group">
                <label for="exampleInputPassword2">Verificar contraseña</label>
                <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Verficar contraseña" ref={(input) => this.password2 = input}/>
              </div>
              <div className="form-group">
                  <label htmlFor="direccion">Direccion</label>
                  <input type="text" className="form-control" id="direccion" aria-describedby="direccion" placeholder="Direccion" ref={(input) => this.direccion = input}/>
              </div>
              <div className="form-group">
                  <label htmlFor="cp">Código postal</label>
                  <input type="text" className="form-control" id="cp" aria-describedby="cp" placeholder="Código postal" ref={(input) => this.cp = input}/>
              </div>
              <div className="ciudad">
                  <label htmlFor="ciudad">Ciudad</label>
                  <input type="text" className="form-control" id="ciudad" aria-describedby="ciudad" placeholder="Ciudad" ref={(input) => this.ciudad = input}/>
              </div>
              <div className="form-group">
                  <label htmlFor="estado">Estado</label>
                  <input type="text" className="form-control" id="estado" aria-describedby="estado" placeholder="Estado" ref={(input) => this.estado = input}/>
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
