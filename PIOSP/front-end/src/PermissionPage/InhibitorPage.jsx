import React from 'react';
import '../components/stylesheets/MainPage.css';
import '../components/stylesheets/Survey.css';
import '../components/stylesheets/Butterfly.css';
import '../components/stylesheets/Permission.css';

import { Segment } from 'semantic-ui-react';

// If participant attended the survey before this component will render
// It show message to the participant for their previous attend and 
// they can not go to the survey questions page
class InhibitorPage extends React.Component {

    render() {
     
      return (
        <div className="mainpage-permission">
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
                <Segment style={{height:'500px'}}>
                <p key="a" className="pwelcome1" > 
                  You have opened this link before
                </p>
                </Segment>
          </div>
        </div>
      );
    }
  }

export  {InhibitorPage};