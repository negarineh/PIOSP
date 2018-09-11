import React from 'react';
import PropTypes from 'prop-types';

import '../stylesheets/Survey.css';
import '../stylesheets/MainPage.css';
import Client from './Client';
import { Button, Segment, Label, Step} from 'semantic-ui-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import cookie from 'react-cookies';

class Survey extends React.Component {
    constructor(props) {
      super(props);   
      this.state={
        AppSource: '',
        description: '',
        photo:'',
        photos: [],
        items: [],
        sendItems: props.sendItems,
        userId: '',
        number: 0,
      };
      this.addItem = this.addItem.bind(this);
    }

    componentDidMount() {
    
    Client.search(photos => {
      this.setState({
        photos: photos,
        number: 0
      });
    });
    // console.log(this.state.photos);
    
    this.setState ({ userId: cookie.load('jwt') });

    window.setTimeout(function(){

    // Move to a new location or you can do something else
    window.location.href = "http://localhost:3001/submit";
    cookie.remove('jwt', { path: '/' });
    }, 15 * 60 * 1000);

    }

    addItem(e) {

      e.preventDefault();
      const data = new FormData(e.target);
      
      var curAppSource = data.get('AppSource'),
          curDescription = data.get('description'),
          curPhoto = data.get('photo'),
          curUserId = cookie.load('jwt');

      var itemArray = this.state.items;
          // sendItems = this.state.items;
      var alwaysTrue = true;
  // try {
      if (alwaysTrue) {
        // itemArray.unshift({
        //     description: this._inputElement.value,
        //     photo: this.state.photos[this.state.number].slice(6, this.state.photos[this.state.number].length-4),
        //     answer: this.AppSource.value ,
        //     id: this.state.userId
        // });
  
              // On submit of the form, send a POST request with the data to the server.
            fetch(`save`,{
              method: 'POST',
              body:JSON.stringify({ 
                AppSource: curAppSource,
                description: curDescription,
                photo: curPhoto,
                id: curUserId
              }),
              headers: {"Content-Type": "application/json"}
            })
            .then(function(response){
              if (response.status >= 200 && response.status < 300) {
              return response;
              }
              const error = new Error(`HTTP Error ${response.statusText}`);
              error.status = response.statusText;
              error.response = response;
              console.log(error);
              throw error;
          }, function(err){console.error(err);});

        this.setState({
          items: itemArray,
          sendItems: itemArray,
          number: this.state.number + 1
        });
      }
    // } catch (err){
    //   console.log(err);
    // }
      // this.setState({
        
      // });
      
      this._inputElement.value = "";
      this.AppSource.checked = false;

      console.log(itemArray); // eslint-disable-line no-console
      console.log(this.state.number); // eslint-disable-line no-console
      // e.preventDefault();

      if (this.state.number === 14){
      // console.log(sendItems[0].answer); // eslint-disable-line no-console

      this.props.history.push("/submit");
    }

      
      console.log(this.state.number); // eslint-disable-line no-console

    }
 
    render() {

      let AppSource = this.state.AppSource;

      const { photos } = this.state;

      return (
    <div className="mainpage">
      <MuiThemeProvider>
      {!AppSource &&
        <div className="wrappermainpage" >      
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

              <Step active >
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
        
        <Segment style={{margin:"10px", overflow:"auto"}}>
            <Label as='a' image><img src={"/"+ photos[this.state.number]} alt=""/>
            Image {this.state.number+1} of 15</Label>
            <form  onSubmit={this.addItem}> 
            <div className="surveygroup1">
            <p key="a" className="psurvey1" > The insect in the image is:(You can select one only)
            </p>
              
              <div key="b" className="question">
                <div className="form-group">
                 <label className="labelpage1">
                  <input 
                     type="radio" 
                     name="AppSource" 
                     className="form-control"
                     value="Bee"
                     ref={(a) => this.AppSource = a}
                     required />
                     Bee
                      </label>
                </div>
                <div className="form-group">
                 <label className="labelpage1">
                  <input 
                     type="radio" 
                     name="AppSource" 
                     className="form-control"
                     value="Beetle"
                     ref={(a) => this.AppSource = a}
                     required />
                     Beetle
                      </label>
                </div>
                <div className="form-group">
                 <label className="labelpage1">
                  <input 
                     type="radio" 
                     name="AppSource" 
                     className="form-control"
                     value="Fly"
                     ref={(a) => this.AppSource = a}
                     required />
                     Fly
                      </label>
                </div>
                <div className="form-group">
                 <label className="labelpage1">
                  <input 
                    //  placeholder= "Email"
                     type="radio" 
                     name="AppSource" 
                     className="form-control"
                     value="Moth/Butterfly"
                     ref={(a) => this.AppSource = a}
                     required />
                     Moth/Butterfly
                      </label>
                </div>
                <div className="form-group">
                 <label className="labelpage1">
                  <input 
                     type="radio" 
                     name="AppSource" 
                     className="form-control"
                     value="Wasp"
                     ref={(a) => this.AppSource = a}
                     required />
                     Wasp
                      </label>
                </div>
                <div className="form-group">
                 <label className="labelpage1">
                  <input 
                     type="radio" 
                     name="AppSource" 
                     className="form-control"
                     value="Don't know"
                     ref={(a) => this.AppSource = a}
                     required />
                     I don't know
                      </label>
                </div>
              </div>
              <p key="d" className="psurvey2"  > (Optional) If you can further identify this insect, please do so in the box below(e.g.Group, genus, species, common name):
                </p>
            {/* A JSX comment */}

                <div key="e" className="form-group-description">
                  <textarea 
                     type="input" 
                     name="description" 
                     className="form-control-description-s"
                     ref={(a) => this._inputElement = a}
                     />
                </div>
                <Button content='Save and Next' icon='right arrow' labelPosition='right' className="btn-primary2s" style={{width:"200px", height:"50px", backgroundImage: "linear-gradient(#20d31a, #8ac208)" , marginTop:"15px", paddingTop:"5px", color:"white", textShadow:"0 -1px 0 #7c7a17", fontFamily:  "sans-serif", fontSize:'15px', fontWeight:"100"}}/>
              </div>

                <div  key="c" className="photossurvey">
                    <img name="photo" className="imgsurvey" src={"/"+ photos[this.state.number]}  alt=" "/>
                    
                </div>
              </form>
              </Segment>
          </div>
  }
          </MuiThemeProvider>
          </div>
      );
    }
  }

  Survey.defaultProps = {
    sendItems: {},
    addItem: () => {},
    history: {},
  }

  Survey.propTypes = {
    sendItems: PropTypes.object.isRequired,
    addItem: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

export default Survey;