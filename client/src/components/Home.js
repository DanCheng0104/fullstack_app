import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Carousel } from 'react-bootstrap';
import image1 from '../images/image1.jpg';
import image2 from '../images/ocean.png';
class Home extends Component {

  render() {
    // const { names } = this.state;
    return (
      <React.Fragment>
        <Header/>  
        <div className = 'home'>
          <div className = 'news'>
          <span>
            This LA Water Hub is a central location for information on LA County urban water management across the many centers of expertise at UCLA. Please also visit the Sustainable LA Grand Challenge website. Sustainable LA is publishing in 2017 the most comprehensive assessment of urban water management for a metropolitan system (City of LA) to date in literature, including a watershed-by-watershed analysis of local water supply potential. And, if you are adventurous to care about energy consumption and greenhouse gas emissions, check out the LA Energy Atlas, a first-of-its-kind website visualizing and downloading detailed energy use data for cities and neighborhoods in L.A. County.
          </span>          
          </div>
        </div>
        {/* <Carousel>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src={image1} />
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src={image2}/>
          </Carousel.Item>
         </Carousel> */}
        <Footer/>  
      </React.Fragment>
      // <div>re</div>
    );
  }
}

export default Home;

