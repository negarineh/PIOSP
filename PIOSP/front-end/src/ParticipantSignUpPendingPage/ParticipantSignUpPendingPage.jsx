import React from 'react';
import '../components/stylesheets/MainPage1.css';
import '../components/stylesheets/MainPage.css';

import { Icon, Step} from 'semantic-ui-react';

// after page 2 when participants submit their name and email 
// they will redirect to this page as a pending page
class ParticipantSignUpPendingPage extends React.Component {
    
    render() {
      return (
            <div className="mainpage">
                <div className="wrappermainpage" > 
                      <div style={{textAlign:'center', margin:'40px'}}>
                        <h2 className='pheader'>Just one more step<br/></h2>
                          <p>Prove that you are not a robot to get your access to survey<br/></p>
                      </div>
                      <div style={{textAlign:'center', margin:'40px'}}>
                                <Step.Group size='large'>
                                  <Step completed>
                                  <Icon name='mail outline'/>
                                  <Step.Title>Step 1</Step.Title>
                                    <Step.Content>
                                      <p>Compeletd</p>
                                    </Step.Content>
                                  </Step>

                                  <Step active>
                                    <Icon name='mail outline' />
                                    <Step.Title style={{marginTop:'20px'}}>Step 2</Step.Title>
                                    <Step.Content>
                                      <p><br/>Go to your </p>
                                      <p>inbox and click  </p>
                                      <p>the confirmation </p> 
                                      <p>email we just</p>
                                      <p>sent you</p>
                                    </Step.Content>
                                  </Step>
                                
                                  <Step>
                                    <Icon name='file text' style={{color:'black'}}/>
                                    <Step.Title>Step 3</Step.Title>
                                    <Step.Content>
                                      <p>You'll </p>
                                      <p>get access </p>
                                      <p>to survey </p>
                                    </Step.Content>
                                  </Step>
                                </Step.Group>
                      </div>
            </div>
          </div>
      );
    }
  }


export  {ParticipantSignUpPendingPage};