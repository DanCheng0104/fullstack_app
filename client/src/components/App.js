import React, { Component } from 'react';
import Header from './Header';
import Map from './Map';
import Footer from './Footer';

class App extends Component {

  render() {
    // const { names } = this.state;
    return (
      <React.Fragment>
        <Header/>  
        <Map/>    
        <Footer/>  
      </React.Fragment>
      // <div>re</div>
    );
  }
}

export default App;
