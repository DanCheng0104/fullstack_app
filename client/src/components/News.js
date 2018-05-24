import React from "react";
import Header from './Header';
// import Footer from './Footer';

const News = () => (
    <React.Fragment>
    <Header/>  
    <div className = 'newspage'>
        <div className='space'></div>
        <div className = 'intro'>
        This LA Water Hub is a central location for information on LA County urban water management across the many centers of expertise at UCLA. Please also visit the Sustainable LA Grand Challenge website. Sustainable LA is publishing in 2017 the most comprehensive assessment of urban water management for a metropolitan system (City of LA) to date in literature, including a watershed-by-watershed analysis of local water supply potential. And, if you are adventurous to care about energy consumption and greenhouse gas emissions, check out the LA Energy Atlas, a first-of-its-kind website visualizing and downloading detailed energy use data for cities and neighborhoods in L.A. County.
        </div>
        <div className = 'item'>
            <h3>September 21, 2017</h3>
            <div className='context'>
                <a href="http://www.waterhub.ucla.edu/docs/UCWater_18Sep17b.pdf" target='_blank'>"The Dollars and Sense of Local Water Supply in Los Angeles"</a>   
                , presented as part of the UC Water Annual Retreat, describes some results from analysis of the future of LA County water management, considering the complicated agency structure, hydroeconomics, and urban ecology.
            </div>
        </div>
        <div className = 'item'>
            <h3>September 16, 2017</h3>
            <div className="context">
                We participated in the "Re-Drawing Urban Waters" working group at the workshop for Sustainable Cities and Landscapes of the Association of Pacific Rim Universities (APRU).
            </div>
        </div>
        <div className = 'item'>
            <h3>August 8, 2017</h3>
            <div className="context">
            The second study on local water supply potential in the <a href="http://escholarship.org/uc/item/2w1916p4" target = '_blank'>Dominguez Channel watershed</a> 
            is out from the UCLA Sustainable LA Grand Challenge. The first published <a href="https://grandchallenges.ucla.edu/happenings/2015/11/13/100-local-water-for-la-county" target='_blank'>study</a> on the Ballona Creek watershed is available online. Stay tuned for more studies and the final report in 2017.
            </div>
        </div>
        <div className = 'item'>
            <h3>July 31, 2017</h3>
            <div className="context_m">
            In July, we presented findings from the 5-year long National Science Foundation research grant, focused on the potential for local water supply in LA, to our Technical Advisory Committee at UCLA. The group of regional utility managers and stakeholders saw the results of research and provided feedback and discussion, as we collectively shape the future of water management in LA. Presentations from the workshop are now posted online, including: 
            <ul>
              <li><a href="http://www.waterhub.ucla.edu/slides/1_NSFTAC_Intro_072417.pdf" target='_blank'>Project Introduction and Summary of Grant Goals</a></li>
                  <li><a href="http://www.waterhub.ucla.edu/slides/2_NSFTAC_Landscape_072417.pdf" target='_blank'>Assessing Water Use of Trees and Lawns in Los Angeles</a></li>
                  <li><a href="http://www.waterhub.ucla.edu/slides/3_NSFTAC_Hydro_072417.pdf" target='_blank'>Hydrology of Local Flows in Los Angeles</a></li>
                  <li><a href="http://www.waterhub.ucla.edu/slides/4_NSFTAC_Model_072417.pdf" target='_blank'>Assembling the Pieces for Regional Local Water Reliance: The <i>Artes</i> model</a></li></ul>
            </div>
        </div>
        <div className = 'item'>
            <h3>July 21, 2017</h3>
            <div className="context_m">
            Liza Litvak and Diane Pataki at the University of Utah developed fact sheets detailing the new methods developed to estimate urban evapotranspiration in LA based on species-specific measurements of tree and lawn water use. The briefs are available below. The work informed a recently published <a href="http://onlinelibrary.wiley.com/doi/10.1002/2016WR020254/full" target='_blank'>study</a> of urban ET in LA from project team members Liza Litvak, Kimberly Manago, Terri Hogue, and Diane Pataki. 
          <ul>
              <li><a href="http://www.waterhub.ucla.edu/docs/Brief_method.pdf" target='_blank'>Research Summary Brief</a></li>
                  <li><a href="http://www.waterhub.ucla.edu/docs/Brief_policy_rev.pdf" target='_blank'>Policy Brief</a></li>
                  <li><a href="http://www.waterhub.ucla.edu/docs/Brief_technical_rev.pdf" target='_blank'>Technical Methods Brief</a></li></ul>
            </div>
        </div>
        <div className = 'item'>
            <h3>June 1, 2017</h3>
            <div className="context">
            Source code, data, documentation, and GIS files are online for <i>Artes</i>, all posted in a <a href="https://erikporse.github.io/artes/" target='_blank'>Github repository</a>
            </div>
        </div>
        <div className = 'item'>
            <h3>May 22, 2017</h3>
            <div className="context">
            We presented at ASCE's Environment and Water Resources International conference in Sacramento.
            </div>
        </div>
        <div className = 'item'>
            <h3>March 18, 2017</h3>
            <div className="context">
            The beta version (v.2.0) of the LA Water Hub includes updated pages throughout, along with a description of our new water resource systems model for L.A. (<i>Artes</i>). Information and links for the model are detailed on the <i>Modeling</i> page. It asseses the potential for maximizing local water supply across scenarios of supply and demand in L.A.
            </div>
        </div>
        <div className = 'item'>
            <h3>January 14, 2016</h3>
            <div className="context_m">
            The beta version (v.1.0) of the LA Water Hub is live. It includes dynamic mapping capabilities for groundwater basins, water supply agencies, and water sources and demands throughout the county. Still under development are pages detailing the larger California engineered water system that brings water to Southern California, as well as detailed maps of residential per capita use by retailer agenices from the State Water Resources Control Board. Please send us an email with any comments or needed corrections.
            </div>
        </div>
    
    </div>    

  </React.Fragment>
);

export default News;
