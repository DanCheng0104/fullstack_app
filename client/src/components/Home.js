import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
// import facebook from '../images/Facebook.svg';
// import twitter from '../images/Twitter.svg';
// import linkedin from '../images/LinkedIn.svg';

class Home extends Component {

  render() {
    // const { names } = this.state;
    return (
      <React.Fragment>
        <Header/>  
        <div className = 'home'>
          <div className = 'news'>
          <span>
            This LA Water Hub is a central location for information on LA County urban water management across the many centers of expertise at UCLA. Please also visit the <a href="https://grandchallenges.ucla.edu/happenings/2015/11/13/100-local-water-for-la-county/" target="_blank">Sustainable LA Grand Challenge</a> website. Sustainable LA is publishing in 2017 the most comprehensive assessment of urban water management for a metropolitan system (City of LA) to date in literature, including a watershed-by-watershed analysis of local water supply potential. And, if you are adventurous to care about energy consumption and greenhouse gas emissions, check out the LA Energy Atlas, a first-of-its-kind website visualizing and downloading detailed energy use data for cities and neighborhoods in L.A. County.
          </span>          
          </div>
          <div className='hfooter'>
            <p>
              <a href="https://www.facebook.com/uclaioes" target="_blank"><img src={window.location.origin + '/Facebook.svg'}/></a>
              <a href="https://www.linkedin.com/groups/4509089/profile" target="_blank"><img src={window.location.origin + '/LinkedIn.svg'}/></a> 
              <a href="https://twitter.com/uclaioes" target="_blank"><img src={window.location.origin + '/Twitter.svg'}/></a>
            </p>
              <a href="http://ccsc.environment.ucla.edu/" target="_blank"><b>CALIFORNIA CENTER FOR SUSTAINABLE COMMUNITIES at UCLA</b></a>
              <a href="https://goo.gl/maps/UexjVhPDxM12" target="_blank">La Kretz Hall, Suite 300, 619 Charles E. Young Drive East, Los Angeles, CA 90095-1496</a>
              <div>
              <a href="mailto:ccsc@ioes.ucla.edu">ccsc@ioes.ucla.edu </a> | <a href="tel:3108253778"> 310.825.3778</a>
              </div>


          </div>
        </div>
      </React.Fragment>

    );
  }
}

export default Home;

