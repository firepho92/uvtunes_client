import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar/NavBar';
import Index from './components/Index/Index';
import ItemsGrid from './components/ItemsGrid/ItemsGrid';
import LoginScreen from './components/LoginScreen/LoginScreen';
import SignupScreen from './components/SignupScreen/SignupScreen';
import ProductView from './components/ProductView/ProductView';
import ShoppingCartView from './components/ShoppingCartView/ShoppingCartView';
import SelectPhysicalItemQuantity from './components/SelectPhysicalItemQuantity/SelectPhysicalItemQuantity';
import PaymentView from './components/PaymentView/PaymentView';
import UserProfile from './components/UserProfile/UserProfile';
import PurchasingHistory from './components/PurchasingHistory/PurchasingHistory';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0,
      user: this.props.user,
      productos: [],
      product: null,
      shoppingCartItems: [],
      physicalProduct: null,
      deliveryData: {price: 700, estimatedTime: "3 días"}
    };
    this.handleViewChange = this.handleViewChange.bind(this);
    this.setUser = this.setUser.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.addShoppingCartItem = this.addShoppingCartItem.bind(this);
    this.handleItemsContext = this.handleItemsContext.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.handlePurchasingMethod = this.handlePurchasingMethod.bind(this);
    this.removeShoppingCartItem = this.removeShoppingCartItem.bind(this);
  }

  isLoggedIn(){
    if(this.state.user !== null){
      return true;
    }else{
      return false;
    }
  }

  getProducts(view, context){
    var self = this;
    axios.get('https://uvtunes-backend.herokuapp.com/productos/')
        .then(function (response) {
            console.log(response.data);
            self.setState({
                productos: response.data,
                itemsContext: context,
                view: view
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

  setUser(user) {
    this.setState({
      user: user
    });
  }

  getProduct(product){
    this.setState({
      product: product
    });
    this.handleViewChange(5);
  }

  addShoppingCartItem(quantity, price){
    var producto = this.state.product;
    producto.precio = price;
    producto.cantidad = quantity;
    this.setState({
      shoppingCartItems: [...this.state.shoppingCartItems, producto]
    })
  }

  handlePurchasingMethod(productType){
    if(this.isLoggedIn()){
      if(productType === 0){
        this.handleViewChange(7);
      }else{
        this.addShoppingCartItem(1, this.state.product.precio_digital);
        this.handleViewChange(6);
      }
    }else{
      console.log('Please log in');
    }
  }

  removeShoppingCartItem(item){
    var items = this.state.shoppingCartItems;
    for (var i = 0; i < items.length; i++) {
      if(item === items[i].id_producto){
        items[i].pop();
        return true;
      }
    }
    return false;
  }

  handleViewChange(view){
    this.setState({
      view: view
    })
  }

  handleItemsContext(view, context){
    this.getProducts(view, context);
  }

  render() {
    return (
      <div className="App">
        <NavBar user = {this.state.user} currentView = {this.state.view} changeView = {this.handleViewChange} changeItemsContext = {this.handleItemsContext}/>
        { this.state.view === 0 ? <Index changeView = {this.handleViewChange} user = {this.state.user} /> : null }
        { this.state.view === 1 || this.state.view === 2 ? <ItemsGrid itemsContext = {this.state.itemsContext} changeView = {this.handleViewChange} productos = {this.state.productos} getProduct = {this.getProduct}/> : null }
        { this.state.view === 3 ? <LoginScreen setUser = {this.setUser} changeView = {this.handleViewChange} /> : null }
        { this.state.view === 4 ? <SignupScreen changeView = {this.handleViewChange} /> : null }
        { this.state.view === 5 ? <ProductView product = {this.state.product} handlePurchasingMethod = {this.handlePurchasingMethod} /> : null }
        { this.state.view === 6 ? <ShoppingCartView items = {this.state.shoppingCartItems} removeShoppingCartItem = {this.removeShoppingCartItem} changeView = {this.handleViewChange} /> : null }
        { this.state.view === 7 ? <SelectPhysicalItemQuantity product = {this.state.physicalProduct} changeView = {this.handleViewChange} /> : null }
        { this.state.view === 8 ? <PaymentView deliveryData = {this.state.deliveryData} /> : null }
        { this.state.view === 9 ? <UserProfile user = {this.state.user} setUser = {this.setUser} changeView = {this.handleViewChange} /> : null }
        { this.state.view === 10 ? <PurchasingHistory changeView = {this.handleViewChange} /> : null }
      </div>
    );
  }
}

export default App;
