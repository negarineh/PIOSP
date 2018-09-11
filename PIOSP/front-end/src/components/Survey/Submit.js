import React from 'react';
import PropTypes from 'prop-types';

import '../stylesheets/Survey.css';
import '../stylesheets/MainPage.css';
import '../stylesheets/Submit.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Segment, Step} from 'semantic-ui-react';

import cookie from 'react-cookies';
import {Link} from 'react-router-dom';

const Star = ({ selected=false, onClick=f=>f }) =>
        <div className={(selected) ? "star selected" : "star"}
             onClick={onClick}>
        </div>


// after participant answers questions, survey will redirect to this page for last part
// in this page participants rate their experience about survey and give information about their pollination research
class Submit extends React.Component {
  constructor(props) {
    super(props);   
    this.state={
      experience: '',
      description: '',
      participation:'',
      photos: [],
      items: [],
      postItem: [],
      finished: false,
      stepIndex: 0,
      starsSelected: props.starsSelected || 0
    };
    this.addItem = this.addItem.bind(this);
    this.change = this.change.bind(this)
  }

  componentDidMount() {

    window.setTimeout(function(){

    // Move to a new location or you can do something else
    window.location.href = "http://localhost:3001/finish";
    cookie.remove('jwt', { path: '/' });
    }, 5 * 60 * 1000);
  }

  change(starsSelected) {
      this.setState({starsSelected})
  }

  addItem(e) {

    e.preventDefault();
    const data = new FormData(e.target);
    
    var curDescription = data.get('description'),
        curparticipation = data.get('participation'),
        curUserId =  cookie.load('jwt');

    var itemArray = this.state.items;
    var alwaysTrue = true;
    
    if (alwaysTrue) {
    
            // On submit of the form, send a POST request with the data to the server.
          fetch(`saveExperience`,{
            method: 'POST',
            body:JSON.stringify({
              id: curUserId,
              experience: this.state.starsSelected,
              description: curDescription,
              participation: curparticipation
            }),
            headers: {"Content-Type": "application/json"}
          }).then(function(response){
            if (response.status >= 200 && response.status < 300) {
              return response;
            }
            const error = new Error(`HTTP Error ${response.statusText}`);
            error.status = response.statusText;
            error.response = response;
            console.log(error); // eslint-disable-line no-console
            throw error;
          }).catch(err => console.log(err));

      this.setState({
        items: itemArray,
        sendItems: itemArray
      });
    }
    
    this.description.value = "";

    this.setState({
      number: this.state.number+1
    })

    cookie.remove('jwt', { path: '/' });

    console.log(itemArray); // eslint-disable-line no-console
    console.log(this.state.number); // eslint-disable-line no-console
   
  }
  
  render() {

    let experience = this.state.experience;

    const { photos } = this.state;
    const {totalStars} = this.props
    const {starsSelected} = this.state

    return (
      <div className="mainpage">
        <MuiThemeProvider>
        {/* <Header/> */}
        {!experience &&
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

              <Step active >
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
          <form  onSubmit={this.addItem}> 
            <p key="a" className="psubmit" > 
              Please rate your insect identification experience, 
              where 1 is have no experience and 5 is highly experienced :
            </p>
              <div key="b" className="questionsubmit">
                <div className="react-container">
                  <div className="star-rating">
                      {[...Array(totalStars)].map((n, i) =>
                          <Star key={i}
                                selected={i<starsSelected}
                                onClick={() => this.change(i+1)}
                                style={{display:"inline", margin:"20px"}}
                                ref={(a) => this.experience = a}
                                name="experience" 
                                value = {starsSelected}
                          />
                      )}
                  </div>
                  </div>
              </div>
            <p className="psubmit" > Have you ever participated in a citizen science project?
            </p>
              <div className="form-group-sub">
                <div className="form-group-submit">
                <label className="labelpage1">
                  <input 
                    //  placeholder= "Email"
                    type="radio" 
                    name="participation" 
                    className="form-control-submit"
                    value="Yes"
                    ref={(a) => this.participation = a}
                    required />
                    Yes
                      </label>
                </div>
                <div className="form-group-submit">
                <label className="labelpage1">
                  <input 
                    //  placeholder= "Email"
                    type="radio" 
                    name="participation" 
                    className="form-control-submit"
                    value="No"
                    ref={(a) => this.participation = a}
                    required />
                    No
                  </label>
                </div>
              </div>
              
              <p key="d" className="psubmit"  > Please give us brief description of type of project:
              </p>
                <textarea 
                  //  placeholder= "Email"
                   type="input" 
                   name="description" 
                   className="form-control-description"
                   ref={(a) => this.description = a}
                  //  maxLength = {40}
                   />
              <button 
                type="submit" 
                className="btn btn-primary2"
                >
                <Link to={'/finish'}>Submit</Link>
              </button>
            </form>
        </Segment>
            {photos} 
          </div>
  }
        </MuiThemeProvider>
      </div>
    );
  }
  }

  Submit.defaultProps = {
    starsSelected: 0,
    totalStars: 5,
    history: {},
    addItem: () => {},
    change: () => {}
  }

  Submit.propTypes = {
    starsSelected: PropTypes.number.isRequired,
    totalStars: PropTypes.number.isRequired,
    history: PropTypes.object.isRequired,
    addItem: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
};

export default Submit;