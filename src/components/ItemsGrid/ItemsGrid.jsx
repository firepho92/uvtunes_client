import React, { Component } from 'react';
import Card from '../Card/Card';

class ItemsGrid extends Component {

    componentWillMount(){
        console.log(this.props.productos)
    }

  render() {
    return (
      <div className="container">
        <h2>{this.props.itemsContext === 'M' ? 'Música' : 'Vídeos'}</h2>
        <div className="container items-container">
          <div className="row">
            {this.props.productos.map(producto => {
              return (
                <div key={producto.id_producto}>
                  {producto.tipo_producto === this.props.itemsContext ? <div className="col-sm-4"><Card getProduct = {this.props.getProduct} producto = {producto} /></div> : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>

    );
  }
}

export default ItemsGrid;
