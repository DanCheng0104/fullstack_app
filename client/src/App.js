import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = { names: []}
  componentDidMount(){
    this.getNames();
  }
  getNames = () => {
    fetch('api/nbs')
      .then(res => res.json())
      .then(names => this.setState({ names:names.data }));
  }
  render() {
    const { names } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ul>
          {names.map((name, index) =>
                <li key={index}>
                  {name.name}
                </li>
              )}
        </ul>
      </div>
    );
  }
}

export default App;
