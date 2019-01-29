import React, { Component } from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from "react-router-dom" 
import Login from './components/login.component/login.component';
import Bookshelf from './components/bookshelf.component/bookshelf.component';

class App extends Component {
  render() {
    return (
      <div className="App background">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} /> 
            <Route exact path="/bookshelf" component={Bookshelf} /> 
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App