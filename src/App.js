import './App.css';
import Home from './Home.js';
import LoginPage from './LoginPage.js'
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'



class App extends Component {
  
  render() {
    return (
      <Router>
        <Route exact path="/" component={LoginPage}/>
        <Route exact path="/homepage" component={Home}/>
      </Router>
    );
  }
}

export default App;
