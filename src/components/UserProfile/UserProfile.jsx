import React, { Component } from 'react';
import axios from "axios/index";

class UserProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      updateMode: false
    }
    this.setUpdateMode = this.setUpdateMode.bind(this);
  }

  setUpdateMode(e, mode) {
    e.preventDefault();
    this.setState({
      updateMode: mode
    });
  }

  updateUser(e) {
    e.preventDefault();

    let data = { 
      "direccion" : this.direccion.value,
      "cp" : this.cp.value,
      "ciudad" : this.ciudad.value,
      "estado" : this.estado.value,
      "id_cliente" : this.props.user.id_cliente,
      "email" : this.props.user.email
    };

    axios.post('https://uvtunes-backend.herokuapp.com/shop/update/', data)
      .then(function (response) {
          if (response.data) {
            let user = this.props.user;
            Object.keys(data).map(function(key) {
              user[key] = data[key];
            });

            this.props.setUser(user);

            this.setState({
              updateMode: false
            });
          } else { 
            alert("No fue posible actualizar los datos");
          }
        }.bind(this))
      .catch(function (error) {
          alert(error);
      });
  }

  logout(e) {
    e.preventDefault();

    axios.post('https://uvtunes-backend.herokuapp.com/shop/logout/')
      .then(function (response) {
        if (response) {        
          this.props.changeView(0);
          this.props.setUser(null);
          sessionStorage.removeItem('user');
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
    const inputs = (!this.state.updateMode ?
                      [<div key="upInfo1" className="form-group row">
                        <label style={{ fontWeight : "bold" }} className="control-label col-sm-2">Dirección:</label>
                        <div className="col-sm-10">{ this.props.user.direccion }</div>
                       </div>,
                       <div key="upInfo2" className="form-group row">
                        <label style={{ fontWeight : "bold" }} className="control-label col-sm-2">Código postal:</label>
                        <div className="col-sm-10">{ this.props.user.cp }</div>
                       </div>,
                       <div key="upInfo3" className="form-group row">
                        <label style={{ fontWeight : "bold" }} className="control-label col-sm-2" htmlFor="formCiudad">Ciudad:</label>
                        <div className="col-sm-10">{ this.props.user.ciudad }</div>
                       </div>,
                       <div key="upInfo4" className="form-group row">
                        <label style={{ fontWeight : "bold" }} className="control-label col-sm-2" htmlFor="formEstado">Estado:</label>
                        <div className="col-sm-10">{ this.props.user.estado }</div>
                       </div>] :
                      [<div key="upInfo5" className="form-group row">
                        <label style={{ fontWeight : "bold" }} className="control-label col-sm-2" htmlFor="formDireccion">Dirección:</label>
                        <div className="col-sm-10"> 
                          <input type="text" className="form-control" id="formDireccion" placeholder={ this.props.user.direccion } ref={(input) => this.direccion = input} />
                        </div>
                       </div>,
                       <div key="upInfo6" className="form-group row">
                        <label style={{ fontWeight : "bold" }} className="control-label col-sm-2" htmlFor="formCP">Código postal:</label>
                        <div className="col-sm-10"> 
                          <input type="text" className="form-control" id="formCP" placeholder={ this.props.user.cp } ref={(input) => this.cp = input} />
                        </div>
                       </div>,
                       <div key="upInfo7" className="form-group row">
                        <label style={{ fontWeight : "bold" }} className="control-label col-sm-2" htmlFor="formCiudad">Ciudad:</label>
                        <div className="col-sm-10"> 
                          <input type="text" className="form-control" id="formCiudad" placeholder={ this.props.user.ciudad } ref={(input) => this.ciudad = input} />
                        </div>
                       </div>,
                       <div key="upInfo8" className="form-group row">
                        <label style={{ fontWeight : "bold" }} className="control-label col-sm-2" htmlFor="formEstado">Estado:</label>
                        <div className="col-sm-10"> 
                          <input type="text" className="form-control" id="formEstado" placeholder={ this.props.user.estado } ref={(input) => this.estado = input} />
                        </div>
                       </div>]);
    const buttons = (!this.state.updateMode ? 
                      [<button type="button" key="upButton1" style={{ marginLeft : "10px" }} className="btn btn-primary" onClick={e => this.handleClick(e, 10)}>Historial de compras</button>,
                       <button type="button" key="upButton2" style={{ marginLeft : "10px" }} className="btn btn-primary" onClick={e => this.setUpdateMode(e, true)}>Editar información</button>,
                       <button type="button" key="upButton3" style={{ marginLeft : "10px" }} className="btn btn-outline-danger" onClick={e => this.logout(e)}>Salir</button>] :
                      [<button type="button" key="upButton4" style={{ marginLeft : "10px" }} className="btn btn-primary" onClick={e => this.updateUser(e, false)}>Guardar cambios</button>,
                       <button type="button" key="upButton5" style={{ marginLeft : "10px" }} className="btn btn-outline-danger" onClick={e => this.setUpdateMode(e, false)}>Cancelar</button>]);

    return (
      <div className="container">
        <h2 style={{ margin: "10px 0px 25px"}}>{this.props.user.nombre + " " + this.props.user.apellido}</h2>
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col">
              <div className="info-box" style={{ height: "auto"}}>
                <h4>Información del usuario</h4><br />
                <div className="horizontal-form" style={{ margin: "10px"}}>
                    <div className="form-group row">
                      <label style={{ fontWeight : "bold" }} className="control-label col-sm-2">Nombre:</label>
                      <div className="col-sm-10"> 
                        { this.props.user.nombre }
                      </div>
                    </div>
                    <div className="form-group row">
                      <label style={{ fontWeight : "bold" }} className="control-label col-sm-2">Apellido:</label>
                      <div className="col-sm-10"> 
                        { this.props.user.apellido }
                      </div>
                    </div>
                    <div className="form-group row">
                      <label style={{ fontWeight : "bold" }} className="control-label col-sm-2">Fecha de nacimiento:</label>
                      <div className="col-sm-10"> 
                        { this.props.user.fecha_nacimiento }
                      </div>
                    </div>
                    <div className="form-group row">
                      <label style={{ fontWeight : "bold" }} className="control-label col-sm-2">Email:</label>
                      <div className="col-sm-10">
                        { this.props.user.email }
                      </div>
                    </div>
                    { inputs }
                </div>
              </div>
            </div>
          </div>
          <br/>
          <div className="row justify-content-between">
            <div className="col-sm-12">
              { buttons }
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default UserProfile;
