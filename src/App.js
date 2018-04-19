import React, { Component } from 'react';
import NavBar from './components/NavBar/NavBar';
import Index from './components/Index/Index';
import ItemsGrid from './components/ItemsGrid/ItemsGrid';
import LoginScreen from './components/LoginScreen/LoginScreen';
import SignupScreen from './components/SignupScreen/SignupScreen';
import ProductView from './components/ProductView/ProductView'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0,
      user: null,
      product: null
    };
    this.handleViewChange = this.handleViewChange.bind(this);
    this.getProduct = this.getProduct.bind(this);
  }

  getProduct(product){
    this.setState({
      product: product
    });
    this.handleViewChange(5);
  }

  handleViewChange(view){
    this.setState({
      view: view
    })
  }

  render() {
    return (
      <div className="App">
        <NavBar user = {this.state.user} currentView = {this.state.view} changeView = {this.handleViewChange}/>
        { this.state.view === 0 ? <Index changeView = {this.handleViewChange} /> : null }
        { this.state.view === 1 || this.state.view === 2 ? <ItemsGrid itemsContext = {this.state.view} changeView = {this.handleViewChange} getProduct = {this.getProduct} /> : null }
        { this.state.view === 3 ? <LoginScreen /> : null }
        { this.state.view === 4 ? <SignupScreen /> : null }
        { this.state.view === 5 ? <ProductView product = {this.state.product} /> : null }
      </div>
    );
  }
}

export default App;
