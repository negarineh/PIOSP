import React from 'react';
import PropTypes from 'prop-types';

import '../stylesheets/Survey.css';
import '../stylesheets/MainPage.css';
import cookie from 'react-cookies';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Segment, Step} from 'semantic-ui-react';

import {Link} from 'react-router-dom';

// first page after participants click on the link that have been sent to them
// after clicking on the start seurvey button page will redirect to first page of survey that shows questions
class Welcome extends React.Component {
    constructor(props) {
      super(props);   
      this.state={
        photo:'',
        photos:props.photos,
        APIResponse:'',
        userId:'',
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(e) {
      e.preventDefault();
      const data = new FormData(e.target);
      
      const curPhoto = data.get('photo');
      
        this.setState({
          photo: curPhoto
        });
       
      const {stepIndex} = this.state;
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      });
    }

    componentDidMount() {

      if (!cookie.load('jwt'))
      this.props.history.push("/login");

      fetch('/save')
        .then(data => data.json())
        .then((data) => { this.setState({ photos: data });
      })
      .catch(err => console.log(err));
      
    }

    componentWillMount() {
    this.setState ({ userId: cookie.load('jwt') });
    cookie.save('jwt', this.state.userId, { path: '/',
    maxAge: 60 * 1000,
    secure: true });

    document.body.className="body-component-a";
  }

    render() {

      return (
    <div className="mainpage">
      <MuiThemeProvider>
      <div className="wrappermainpage">      
        <div style={{width: 'auto', margin: 'auto', color:"dimgray", paddingLeft:"10px", overflow:'auto'}}>
          <Step.Group ordered size="mini" >
                <Step completed >
                  <Step.Content>
                    <Step.Title>Enrolling</Step.Title>
                    <Step.Description>Insert your email </Step.Description>
                  </Step.Content>
                </Step>

                <Step active >
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

            <Segment style={{margin:"10px"}}>
              <form  onSubmit={this.handleSubmit}> 
                <div className="wrapperWelcome"> 
                    <p key="a" className="pwelcome" > Welcome to our Survey
                      </p>
                        <button 
                          type="submit" 
                          className="btn btn-primary2100"
                          // onClick={this.totheotherlink.bind(this)}
                          >
                          <Link to={'/survey'}>Start Survey</Link>
                        </button>
                  </div>
                </form>
            </Segment>
              
          </div>
        </MuiThemeProvider>
      </div>
      );
    }
  }

  Welcome.defaultProps = {
    photos: {},
    handleSubmit: () => {},
    history: {},
  }

  Welcome.propTypes = {
    photos: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

export default Welcome;