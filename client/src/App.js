import React, { Component } from 'react';
import Header from './components/Header';
import Map from './components/Map';
import Footer from './components/Footer';

class App extends Component {
  // state = { names: []}
  // componentDidMount(){
  //   this.getNames();
  // }
  // getNames = () => {
  //   fetch('api/nbs')
  //     .then(res => res.json())
  //     .then(names => this.setState({ names:names.data }));
  // }
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
