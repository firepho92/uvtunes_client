import React, { Component } from 'react';

class LoginScreen extends Component {

  handleSubmit(e){
    e.preventDefault();
  }

  render(){
    return(
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-6">
            <h2>Entrar</h2>
            <form onSubmit={e => this.handleSubmit(e)}>
              <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Contraseña</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Contraseña" />
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
