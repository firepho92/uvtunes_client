import React, { Component } from 'react';

class ShoppingCartView extends Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-6">
            <h2>Carrito de compras</h2>
          </div>
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-6">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Producto</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio</th>
                </tr>
              </thead>
              <tbody>
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingCartView;
