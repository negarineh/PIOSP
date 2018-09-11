import React from 'react';
import '../components/stylesheets/MainPage.css';
import '../components/stylesheets/Survey.css';
import '../components/stylesheets/Butterfly.css';
import '../components/stylesheets/Permission.css';
import { Segment} from 'semantic-ui-react'; 

// render when someone wants to have access to survey pages again
// this will prevent attend agin or manipulate pages 
class PermissionPage extends React.Component {
    
    render() {
     
      return (
        <div className="mainpage-permission">
          {/* <Header/> */}
          <div className="butterfly">
            <div className="body">
              <img src="http://fjordstudio.dk/animations/img/butterfly3-body.png" alt=""/>
            </div>
            <div className="leftwing">
                <img src="http://fjordstudio.dk/animations/img/butterfly3-leftwing.png" alt=""/>
            </div>
            <div className="rightwing">
                <img src="http://fjordstudio.dk/animations/img/butterfly3-rightwing.png" alt=""/>
            </div>
          </div>

          <div className="wrappermainpage-permission">    
            <Segment style={{paddingLeft:"10px"}}>
                  <p key="a" className="pwelcome1" > 
                  We study community ecology in agroecosystems
                  </p>
                  <p key="a" className="pwelcome2" > 
                  1.  Crop Pollinator Identity and Ecology
                  </p>
                  <p key="a" className="pwelcome3" > 
                  Pollinator communities include native and introduced bees, flies, beetles, moths, butterflies, and birds, as well as other taxa. These taxa provide pollination services for up to 87.5% of all flowering plants and 75% of the leading global food crops. We are interested in finding out which pollinators visit which crops in a range of agroecosystems. This project is supported by funding from the Australian Government Department of Agriculture and Water resources as part of its Rural R&D for Profit Programme and the Ian Potter Foundation.
                  </p>
                  <p key="a" className="pwelcome2" > 
                  2.  The Mechanisms Underlying Crop Pollinator Effectiveness
                  </p>
                  <p key="a" className="pwelcome3" > 
                  Maximally effective pollination results from a complex assortment of factors that influence the pollination process before and after pollen deposition. The effectiveness of individual pollinators is determined by the combined outcomes of the amount, quality and timing of the pollen transferred which is strongly related to pollinator foraging behaviour, morphology and density. Variation in the identity and spatial and temporal structuring of plant and pollinator communities further affect effective pollination, impacting pollen availability and post-pollination factors, such as pollen-pistil and/or pollen-pollen interactions on the stigma. Pollination failure can thus result from problems at any or all of these stages of pollen transfer. This project is funded by the Australian Research Council via a Discovery Early Career Researcher Award (DECRA) awarded to Romina Rader (DE170101349).
                  </p>
                  <p key="a" className="pwelcome2" > 
                  3.  Biodiversity and Ecosystem Services in Agricultural Landscapes
                  </p>
                  <p key="a" className="pwelcome3" > 
                  Many plant and animal species live in and/or use resources from agricultural landscapes.  We are interested in understanding which taxa live in these landscapes and how they use these landscapes.  We are especially interested in how biodiversity can provide ecosystem services within modified systems where we obtain much of our food from.  Our group studies biodiversity and ecosystem services across a variety of agricultural landscapes in Australia, including fruit orchards, grazing landscapes and field crops. This work is funded the UNE Postdoctoral Fellowship scheme.
                  </p> 
                  <p key="a" className="pwelcome2" > 
                  Our lab is based at the University of New England, Armidale NSW Australia.
                  </p>
            </Segment>   
          </div>
        </div>
      );
    }
  }

export  {PermissionPage};