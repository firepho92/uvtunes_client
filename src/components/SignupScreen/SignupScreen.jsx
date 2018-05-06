import React, { Component } from 'react';
import ReactstrapModal from '../ReactstrapModal/ReactstrapModal';
import axios from "axios/index";
import loadingGif from '../../images/loading.gif';

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAllowed: false
    };

    this.checkEmail = this.checkEmail.bind(this);
  }

  changeModal(changes) {
    Object.keys(changes).forEach(function(key, index) {
      switch(key) {
        case "setButton":
          this.modal.setButton(changes[key]);
          break;
        case "setContent":
          this.modal.setContent(changes[key]);
          break;
        case "setTitle":
          this.modal.setTitle(changes[key]);
          break;
        case "setFooterVisibility":
          this.modal.setFooterVisibility(changes[key]);
          break;
        default:
          console.log("Function unknown!");
      }
    }.bind(this));
  }

  checkEmail() {
    let changes = {
      "setContent" : <div style={{textAlign : "center"}}>
                        No fue posible verificar el correo... <br />
                        Por favor, intente nuevamente más tarde.
                      </div>,
      "setTitle" : "Problemas en el servidor",
      "setFooterVisibility" : true,
      "setButton" : {
        "text" : "Ok :(",
        "action": () => this.modal.toggle()
      }
    }

    if (this.email.value.trim() !== "")
      axios.post('https://uvtunes-backend.herokuapp.com/shop/verify-email/', { "email" : this.email.value.trim() })
        .then(function (response) {
          if (response.data.exito) {
            this.setState({ emailAllowed : response.data.free });
          } else {      
            this.changeModal(changes);
            this.modal.toggle();
          }
        }.bind(this))
        .catch(function (error) {
          this.changeModal(changes);
          this.modal.toggle();
        }.bind(this));
  }

  registrar(e) {
    e.preventDefault();    
    
    let changes = {
      "setContent" : <div style={{textAlign : "center"}}>
                        Este email ya está en uso! <br />
                        Por favor, insira otro email.
                      </div>,
      "setTitle" : "Email ya registrado",
      "setFooterVisibility" : false
    }

    if (!this.state.emailAllowed) {
      this.changeModal(changes);
      this.modal.toggle();
      return false;
    }

    let data = { 
      "nombre" : this.nombre.value,
      "apellido" : this.apellido.value,
      "fecha_nacimiento" : this.fecha_nacimiento.value,
      "email" : this.email.value,
      "contrasena" : this.contrasena.value,
      "direccion" : this.direccion.value,
      "cp" : this.cp.value,
      "ciudad" : this.ciudad.value,
      "estado" : this.estado.value
    };
    
    changes = {
      "setContent" : <div style={{textAlign : "center"}}>
                        Enviando solicitud. Por favor aguarde...<br />
                        <img src={loadingGif} alt="Aguarde..." />
                      </div>,
      "setTitle" : "Solicitando registro...",
      "setFooterVisibility" : false
    }

    this.changeModal(changes);
    this.modal.toggle();
    
    changes = {
      "setContent" : <div style={{textAlign : "center"}}>
                        Ocurrió un error en la solicitud... <br />
                        Por favor, intente nuevamente más tarde.
                      </div>,
      "setTitle" : "Problemas al registrar",
      "setFooterVisibility" : true,
      "setButton" : {
        "text" : "Ok :(",
        "action": () => this.modal.toggle()
      }
    }

    axios.post('https://uvtunes-backend.herokuapp.com/shop/register/', data)
      .then(function (response) {
          if (response.data)         
            changes = {
              "setContent" : <div style={{textAlign : "center"}}>
                                Su registro fue efectuado con exito. <br />
                                Para acceder al sistema usted necesita activa su cuenta.<br />
                                Un correo con el link para activación de la cuenta fue enviado para su email.
                              </div>,
              "setTitle" : "Registro efectuado",
              "setFooterVisibility" : true,
              "setButton" : {
                "text" : "Ok, ¡gracias!",
                "action": () => this.props.changeView(3)
              }
            }

          this.changeModal(changes);
          if (!this.modal.getVisibility()) this.modal.toggle();
        }.bind(this))
      .catch(function (error) {
          this.changeModal(changes);
          if (!this.modal.getVisibility()) this.modal.toggle();
      }.bind(this));
  }

  render() {
    return (
      <div className="container">
        <ReactstrapModal button={{ action: () => this.modal.toggle(), text: "Cerrar" }} ref={instance => { this.modal = instance; }} />
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-6">
            <h2>Crear cuenta</h2>
            <form onSubmit={e => this.registrar(e)}>
              <div className="form-group">
                <label htmlFor="formNombre">Nombre</label>
                <input type="text" className="form-control" id="formNombre" placeholder="Nombre" ref={(input) => this.nombre = input} required={true} pattern=".*\S+.*" maxLength="50" />
              </div>
              <div className="form-group">
                <label htmlFor="formApellido">Apellido</label>
                <input type="text" className="form-control" id="formApellido" placeholder="Apellido" ref={(input) => this.apellido = input} required={true} pattern=".*\S+.*" maxLength="50" />
              </div>
              <div className="form-group">
                  <label htmlFor="formNacimiento">Fecha de nacimiento</label>
                  <input type="date" className="form-control" id="formNacimiento" placeholder="Fecha de nacimiento" ref={(input) => this.fecha_nacimiento = input} required={true} pattern=".*\S+.*" defaultValue={(() => {
                    var data = new Date();    
                    return (data.getFullYear() - 20) + "-" + ('0' + (data.getMonth() + 1)).slice(-2) + "-" + ('0' + data.getDate()).slice(-2);
                  })()} />
              </div>
              <div className="form-group">
                <label htmlFor="formEmail">Email</label>
                <input type="email" className="form-control" id="formEmail" placeholder="Email" onBlur={() => this.checkEmail()} ref={(input) => this.email = input} required={true} pattern=".*\S+.*" maxLength="45" />
              </div>
              <div className="form-group">
                <label htmlFor="formContrasena">Contraseña</label>
                <input type="password" className="form-control" id="formContrasena" placeholder="Contraseña" ref={(input) => this.contrasena = input} required={true} pattern="^\S{6,}$" onChange={() => {
                  // Function created by "Francisco Tomé Costa" en https://stackoverflow.com/questions/9142527/can-you-require-two-form-fields-to-match-with-html5
                  this.contrasena.setCustomValidity(this.contrasena.validity.patternMismatch ? 'La contraseña necesita de al menos 6 caracteres' : ''); 
                  if (this.contrasena.checkValidity()) this.contrasena.form.formVContrasena.pattern = this.contrasena.value;
                }} maxLength="20" />
              </div>
              <div className="form-group">
                <label htmlFor="formVContrasena">Verificar contraseña</label>
                <input type="password" className="form-control" name="formVContrasena" placeholder="Contraseña" ref={(input) => this.vContrasena = input} required={true} pattern="^\S{6,}$" onChange={() => {
                  this.vContrasena.setCustomValidity(this.vContrasena.validity.patternMismatch ? 'Insira la misma contraseña' : '');
                }} maxLength="20" />
              </div>
              <div className="form-group">
                  <label htmlFor="formDireccion">Dirección</label>
                  <input type="text" className="form-control" id="direccion" placeholder="Dirección" ref={(input) => this.direccion = input} maxLength="60"/>
              </div>
              <div className="form-group">
                  <label htmlFor="formCP">Código postal</label>
                  <input type="text" className="form-control" id="formCP" placeholder="Código postal" pattern="[0-9]{5}" ref={(input) => this.cp = input} onFocus={() => this.cp.setCustomValidity(this.cp.validity.patternMismatch ? 'El código postal debe tener 5 carácteres' : '')} onKeyDown={() => { 
                    this.cp.value = this.cp.value.replace(/[^\d]/,'');
                  }} onKeyUp={() => this.cp.value = this.cp.value.replace(/[^\d]/,'') } maxLength="5" />
              </div>
              <div className="form-group">
                  <label htmlFor="formCiudad">Ciudad</label>
                  <input type="text" className="form-control" id="formCiudad" placeholder="Ciudad" ref={(input) => this.ciudad = input} maxLength="30" />
              </div>
              <div className="form-group">
                  <label htmlFor="formEstado">Estado</label>
                  <input type="text" className="form-control" id="formEstado" placeholder="Estado" ref={(input) => this.estado = input} maxLength="20"/>
              </div>
              <button type="submit" className="btn btn-primary">Aceptar</button><br /><br />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupScreen;