import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../product/product';
import HttpService from '../services/http-service';

const http = new HttpService();

class App extends Component {
	
  constructor(props){
	  super(props);
	   //bind function
	  this.loadData = this.loadData.bind(this);
	  
	  this.loadData();
	   
  }
	
  loadData = () => {
	  http.getProducts().then(products => {
		  console.lod(products);
	  }, err => {
		  
	  });
  }
	
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Whatever</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
