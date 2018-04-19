import React, { Component } from 'react';
import Card from '../Card/Card';

class ItemsGrid extends Component {
  constructor(props){
    super(props);
    this.state = {
      cards: [
        {id_producto:"asd23", nombre: "See you on the other side", artistas: [{nombre: "KoRn"}], descripcion: "Salió a la venta el 6 de diciembre de 2005 y fue grabado en el estudio de la casa del vocalista Jonathan Davis donde se grabó el disco Take a Look in the Mirror.", anio: "2005", imagen: "", precio: "100"},
        {id_producto: "lksdf23", nombre: "In rainbows", artistas: [{nombre: "Radiohead"}], descripcion: "Radiohead trabajó en el álbum durante más de dos años con los productores Mark Stent y Nigel Godrich, comenzando a principios de 2005. Durante el proceso, la banda salió de gira tres meses por Europa y Estados Unidos a mediados de 2006.", anio: "2007", imagen: "", precio: "200"},
      ]
    }
    this.alex = this.alex.bind(this)
  }

  render() {
    return (
      <div className="container">
        <h2>{this.props.itemsContext === 1 ? "Música" : "Películas"}</h2>
        <div className="container">
          <div className="row">
            {this.state.cards.map(card => {
              return (
                <div className="col-sm-4" key={card.id_producto}>
                  <Card getProduct = {this.props.getProduct} card = {card} />
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
