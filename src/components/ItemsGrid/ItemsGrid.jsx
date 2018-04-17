import React, { Component } from 'react';

class ItemsGrid extends Component {

  render() {
    return (
      <div>{this.props.itemsContext === 1 ? "Música" : "Películas"}</div>
    );
  }
}

export default ItemsGrid;
