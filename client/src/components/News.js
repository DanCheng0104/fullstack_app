import React from "react";
import Header from './Header';
// import Footer from './Footer';

const News = () => (
    <React.Fragment>
    <Header/>  
    <div className = 'newspage'>
        <div className = 'intro'>
        This LA Water Hub is a central location for information on LA County urban water management across the many centers of expertise at UCLA. Please also visit the Sustainable LA Grand Challenge website. Sustainable LA is publishing in 2017 the most comprehensive assessment of urban water management for a metropolitan system (City of LA) to date in literature, including a watershed-by-watershed analysis of local water supply potential. And, if you are adventurous to care about energy consumption and greenhouse gas emissions, check out the LA Energy Atlas, a first-of-its-kind website visualizing and downloading detailed energy use data for cities and neighborhoods in L.A. County.
        </div>
    </div>    
    {/* <Footer/>   */}
  </React.Fragment>
);

export default News;
