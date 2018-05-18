import React, { Component } from 'react';
import '../css/style.css';



class Header extends Component {
  render() {
    return (
      <section className="nav-menu">
          <a href="/test">Home</a>
          <a href="#">Method</a>
          <a href="/dwp">LADWP</a>
          <a href="#">Other2</a>

      </section>
    );
  }
}

export default Header;