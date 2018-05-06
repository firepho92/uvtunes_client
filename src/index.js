import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios/index";

window.onload = function() {
    let search = window.location.search;

    if (search !== "") {       
        search = search.substr(1);
        
        let variables = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}');
        
        if (variables["token"] !== undefined) {
            axios.post('https://uvtunes-backend.herokuapp.com/shop/activate/', {"token" : variables["token"]})
                .then(function (response) {
                    window.location.href = `${window.location.protocol}//${window.location.host}${window.location.pathname}?success=${response.data.exito}`;
                }).catch((error) => window.location.href = `${window.location.protocol}//${window.location.host}${window.location.pathname}?success=false`);
            } else if (variables["success"] !== undefined) {
                window.reactApp.handleViewChange(3);
                if (variables["success"]) window.reactApp.loginScreen.setAlert(true, "Su cuenta fue activada con exito.", "success");
                else window.reactApp.loginScreen.setAlert(true, "No fue posible activar su cuenta.", "danger");
        }
    }
}

ReactDOM.render(<App user = { JSON.parse(sessionStorage.getItem('user')) } ref={(app) => window.reactApp = app} />, document.getElementById('root'));
registerServiceWorker();
