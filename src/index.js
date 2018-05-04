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
        
        if (variables["token"] !== undefined) 
            axios.post('https://uvtunes-backend.herokuapp.com/shop/activate/', {"token" : variables["token"]})
                .then(function (response) {
                    if (response.data.exito) alert("Su cuenta fue activada!");
                });
    }
}

ReactDOM.render(<App user = { JSON.parse(sessionStorage.getItem('user')) } />, document.getElementById('root'));
registerServiceWorker();
