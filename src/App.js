import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import Header from './components/Header/Header';
import Body from './components/Body/Body';
// import TodoApp from './components/Todo/Todo';


class App extends Component {
  render() {
    return (
      <div className="fluid-container">
        <div className="row">
          <div className="col-xs-12 col-md-4 col-md-offset-4">
            <Header/>
            <Body />
          </div>
        </div>
      </div>    
    
    );
  }
}

export default App;
