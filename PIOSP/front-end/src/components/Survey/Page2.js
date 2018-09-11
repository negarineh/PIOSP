import React from 'react';
import { PropTypes } from 'prop-types';
import '../stylesheets/Page2.css';
import '../stylesheets/MainPage.css'; 
import '../stylesheets/fonts/font-awesome-4.7.0/scss/font-awesome.css';
import '../stylesheets/fonts/font-awesome-4.7.0/less/animated.less';
// import Modal1 from 'react-modal';
// import Loading from 'react-loading-components';
// import { confirmAlert } from 'react-confirm-alert'; // Import
import '../stylesheets/react-confirm-alert.css' // Import css

import { Segment, Icon, Step, Modal} from 'semantic-ui-react';

// second page of survey
// In this page we are receiving name and email of participant and sending through server
// after this page we have participant pending page 
class Page2 extends React.Component {
    constructor(props) {
      super(props);   
      this.state={
        username: '',
        email: '',
        // modalIsOpen: false,
      };
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(e) {
      e.preventDefault();
      const data = new FormData(e.target);
      
      const curUsername = data.get('username'),
            curEmail = data.get('email');

      // On submit of the form, send a POST request with the data to the server.
    fetch(`signupparticipant`,{
      method: 'POST',
      body:JSON.stringify({
        username: curUsername,
        email: curEmail,
        // modalIsOpen: true
      }),
      headers: {"Content-Type": "application/json"}
    })
    .then(function(response){
      return response.json()
    }).then(function(body){
      // console.log(body);
      alert(curEmail);
    })
    .catch(err => console.log(err));
    
    this.username.value ="";
    this.email.value="";
    this.checkbox1.checked=false;
    this.checkbox2.checked=false;
    this.props.history.push('/ParticipantSignUpPending');

      }

  render() {
      let email = this.state.email;

      return (
        <div className="mainpage">

        {!email &&
        <div className="wrappermainpage">      

            <div className="wrapperpage2">
            <div style={{width: 'auto', margin: 'auto', color:"dimgray"}}>
            <Step.Group ordered size="mini" >
              <Step active >
                <Step.Content>
                  <Step.Title>Enrolling</Step.Title>
                  <Step.Description>Insert your email </Step.Description>
                </Step.Content>
              </Step>

              <Step disabled >
                <Step.Content>
                  <Step.Title>Confirmed Email </Step.Title>
                  <Step.Description>Welcome to our Survey</Step.Description>
                </Step.Content>
              </Step>

              <Step disabled >
                <Step.Content>
                  <Step.Title>Survey Questions</Step.Title>
                  <Step.Description>Please answer questions</Step.Description>
                </Step.Content>
              </Step>

              <Step disabled >
                <Step.Content>
                  <Step.Title>Rating and Further Experiences</Step.Title>
                  <Step.Description>Please rate our survey</Step.Description>
                </Step.Content>
              </Step>

              <Step disabled >
                <Step.Content>
                  <Step.Title>Survey Submitted</Step.Title>
                  <Step.Description>Thanks for your participation</Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>
            </div>
         
            <Segment >
           
              <form  onSubmit={this.handleSubmit}> 
                <table>
                  <p className="ppage2" > Please insert your name and email address(Name just used as alias)
                  </p>
                  <div className="form-group-p2">
                  <Icon name='user' style={{color:"black"}}/>
                  <input 
                      placeholder= "Name"
                      type="username" 
                      name="username" 
                      className="form-control-2"
                      ref={(a) => this.username = a}
                      required/>
                  </div>
                  <div className="form-group-p2">
                  <Icon name='mail' style={{color:"black"}} />
                    <input 
                      placeholder= "Email"
                      type="email" 
                      name="email" 
                      className="form-control-2"
                      ref={(a) => this.email = a}
                      required/>
                  </div>
                 <div className="form-group-pag2">
                 <label className="labelpage1" style={{fontFamily:  "sans-serif", fontSize:'15px'}}>
                  <input 
                     type="checkbox" 
                     name="checkbox1" 
                     className="form-control-12"
                     ref={(a) => this.checkbox1 = a}
                     required />
                     I agree to the 
                     <Modal
                      trigger={<a style={{fontFamily:  "sans-serif", fontSize:'15px', color:"blue"}}> {' '}Terms & Use
                     </a>}
                      header='Pollinator Insect Online Survey'
                      content={<p style={{ padding: '15px', textAlign:'justify'}}>Thank you for interest in participating in this survey. This survey is run by 
                                      the University of New England ...
                                       <br/>
                                      In this survey you will be shown a series of images of insect pollinators, 
                                      and will be asked to identify the type of insect shown in each by selecting multiple choice answers.  </p>}
                      actions={[
                        
                          { key: 'done', content: 'Agree', positive: true },
                        ]}
                      style={{ position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              textAlign:'justify'}}
                      />
                     , including our Cookie use
                      </label>
                </div>
                <div className="form-group-pag2">
                  <input 
                     type="checkbox" 
                     name="checkbox2" 
                     className="form-control-12"
                     ref={(a) => this.checkbox2 = a}
                     required />
                     <label className="labelpage1" style={{fontFamily:  "sans-serif", fontSize:'15px'}}>
                      I have not undertaken</label>
                </div>
                <button 
                  type="submit" 
                  className="btn-primary21"
                  style={{fontFamily:  "sans-serif", fontSize:'15px', paddingLeft:"40px"}}
                  >
                  Send Email
                </button>
                </table>
                </form>
                </Segment>
              </div>
          </div>
    }
          </div>
      );
    }
  }

Page2.defaultProps = {
  history: {},
  userDelete: () => {},
  showDelete: () => {},
  // email: '',
  // name: '',
  handleSubmit: () => {},
  closeModal: () => {},
  openModal: () => {}
}
 
// prop checks
Page2.propTypes = {
  // modalIsOpen: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  userDelete: PropTypes.func.isRequired,
  // email: PropTypes.string.isRequired,
  // name: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // afterOpenModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Page2;