import React, { Component } from 'react';
import NavBar from './components/NavBar/NavBar';
import Index from './components/Index/Index';
import ItemsGrid from './components/ItemsGrid/ItemsGrid';
import LoginScreen from './components/LoginScreen/LoginScreen';
import SignupScreen from './components/SignupScreen/SignupScreen';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0,
      user: null
    };
    this.handleViewChange = this.handleViewChange.bind(this);
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
        { this.state.view === 1 || this.state.view === 2 ? <ItemsGrid itemsContext = {this.state.view} /> : null }
        { this.state.view === 3 ? <LoginScreen /> : null }
        { this.state.view === 4 ? <SignupScreen /> : null }
      </div>
    );
  }
}

export default App;
