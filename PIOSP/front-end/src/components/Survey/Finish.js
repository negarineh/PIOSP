import React from 'react';
import PropTypes from 'prop-types';

import '../stylesheets/Survey.css';
import '../stylesheets/MainPage.css';
import '../stylesheets/Survey.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Segment, Step} from 'semantic-ui-react';
import {Link} from 'react-router-dom';


// last page of survey 
class Finish extends React.Component {
    constructor(props) {
      super(props);   
      this.state={
        stepIndex: 0,
      };
    }
    
  render() {
 
  return (
    <div className="mainpage">
     <MuiThemeProvider>
      {/* <Header/> */}
      <div className="wrappermainpage">      

      <div style={{width: 'auto', margin: 'auto', color:"dimgray", paddingLeft:"10px", overflow:'auto'}}>
      <Step.Group ordered size="mini" >
              <Step completed >
                <Step.Content>
                  <Step.Title>Enrolling</Step.Title>
                  <Step.Description>Insert your email </Step.Description>
                </Step.Content>
              </Step>

              <Step completed >
                <Step.Content>
                  <Step.Title>Confirmed Email </Step.Title>
                  <Step.Description>Welcome to our Survey</Step.Description>
                </Step.Content>
              </Step>

              <Step completed >
                <Step.Content>
                  <Step.Title>Survey Questions</Step.Title>
                  <Step.Description>Please answer questions</Step.Description>
                </Step.Content>
              </Step>

              <Step completed >
                <Step.Content>
                  <Step.Title>Rating and Further Experiences</Step.Title>
                  <Step.Description>Please rate our survey</Step.Description>
                </Step.Content>
              </Step>

              <Step active >
                <Step.Content>
                  <Step.Title>Survey Submitted</Step.Title>
                  <Step.Description>Thanks for your participation</Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>
        </div>
        <Segment style={{margin:"10px", overflow:"auto"}}>
            <div style={{textAlign:'center'}}>
              <p key="a" className="psurvey21" > 
              Thank for your participation
              </p>
              
              <button 
                          type="submit" 
                          className="btn btn-primary2100"
                          
                          >
                  {/* Survey Home Page */}
                <Link  to={"/mainpage"}>Survey Home Page</Link>
              </button>
            </div>
        </Segment>
      </div>
      </MuiThemeProvider>
    </div>
      );
    }
  }

  Finish.defaultProps = {
    history: {},
  }

// prop checks
  Finish.propTypes = {
    history: PropTypes.object.isRequired,
};

export default Finish;