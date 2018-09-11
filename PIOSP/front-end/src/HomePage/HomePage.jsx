import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../components/stylesheets/MainPage.css';
import {ReportAnswerCategoryPage} from '../ReportAnswerCategoryPage';
import {ReportAnswerPhotoPage} from '../ReportAnswerCategoryPage';
import {SurveyResultsPage} from '../SurveyResultsPage';
import {SurveyResultsAnswerPage} from '../SurveyResultsPage';
import {AdminList} from '../AdminListPage';
import {AdminTablePage} from '../AdminListPage';
import {ReportAdminPage} from '../ReportAnswerCategoryPage';
import {RegisterPage} from '../RegisterPage';
import FillTable from '../components/Survey/FillTable';
import OptionMenuResults from '../components/Survey/OptionMenuResults';
import {ProfilePage} from '../ProfilePage';

import Collapsible from 'react-collapsible';

import cookie from 'react-cookies';

import { Menu, Segment, Icon, Divider, Grid, Dropdown } from 'semantic-ui-react';
import '../../node_modules/semantic-ui-css/semantic.min.css';
import {CoverPage} from '../HomePage';
import ErrorBoundry from '../ErrorBoundry/ErrorBoundry';


  const tagOptions = [
      {
        text: 'Sign Out',
        value: 'SignOut',
        icon: {name:'sign out', color:'black'},
      },
    ];

// customized dashbord component for main admin
// main admin have access to list of admins and can update, delete or add admins.
class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
      visible: false,
      userId:'',
      profileMenu:'',
    };
    this.logoutClick = this.logoutClick.bind(this);
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }


  handleChange = (e, { name, value }) => 
  {
    this.setState({ [name]: value , profileMenu: value});
   
    if (value === 'SignOut')
        this.logoutClick();
  };

  componentDidMount() { 
    this.setState({userId: cookie.load('jwt')});
    cookie.save('jwt', this.state.userId, { path: '/' });
}

logoutClick(){
    cookie.remove('jwt', { path: '/' });
    this.props.history.push('/login');
}

  render() {

      const { activeItem, profileMenu } = this.state;

    return (
      <div >
      
        <Segment style={{paddingTop:"10px", background: 'url("/img/6830481-cloudy-sky.jpg")center center', height:'100vh'}} attached='top'>
          <Menu style={{ height:"20px", background: 'whitesmoke', paddingRight:'20px'}}>
            <Menu.Menu horizontal="true"  position="right" >
              <Menu.Item name='inbox' active={activeItem === 'inbox'} >
                <div className='ui transparent icon input'>
                    <input className='prompt' type='text' placeholder='Search ...' style={{marginTop:"15px", background:'teal'}} />
                    <Icon name='search' style={{marginTop:"2px", paddingRight:'40px'}} color='teal' size='large'/>
                </div>
              </Menu.Item>
              <Dropdown inline icon='user' style={{marginTop:"10px", color:'teal', paddingRight:'20px'}}  direction='left' >
                  <Dropdown.Menu direction='left' >
                    {tagOptions.map(option => <Dropdown.Item key={option.value} {...option} onClick={this.handleChange.bind(this)}/>)}
                    {profileMenu ==='Profile'? <ProfilePage/>: null }
                  </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Menu>
         
        
    <Grid  stretched style={{background: 'url("/img/6830481-cloudy-sky.jpg")center center'}}>
      <Grid.Column mobile={4} tablet={4} computer={4} largeScreen={4} widescreen={4}>
        
        <Menu vertical fluid style={{background:'url("/img/Picture4.png")center center', textAlign:'left'}} >
            <Menu.Item name='home' onClick={this.handleItemClick.bind(this)} style={{color:'white'}}>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Divider></Divider> 
            <Menu.Item style={{color:'white'}}>
              <Icon name='users' />
              <Icon name='caret right'/>
              {/* Admins */}
              <Collapsible trigger='Admins'>
              <Menu.Menu>
                <Menu.Item name='List of Admins' onClick={this.handleItemClick.bind(this)} style={{color:'white'}} />
                <Menu.Item name='Edit Admin List' onClick={this.handleItemClick.bind(this)} style={{color:'white'}} />
                <Menu.Item name='Register New Admin' onClick={this.handleItemClick.bind(this)} style={{color:'white'}} />
              </Menu.Menu>
              </Collapsible>
            </Menu.Item>
            <Divider inverted></Divider>
            <Menu.Item name='pollinator' onClick={this.handleItemClick.bind(this)} style={{color:'white'}}>
              <Icon name='database' />
              Pollinator Data
            </Menu.Item>
            <Divider></Divider>
            <Menu.Item name='survey' style={{color:'white'}}>
              <Icon name='server' />
              <Icon name='caret right'/>
              {/* Survey Results */}
              <Collapsible trigger='Survey Results'>
              <Menu.Menu>
                <Menu.Item name='Survey Results(Answer Table)' onClick={this.handleItemClick.bind(this)} style={{color:'white'}} />
                <Menu.Item name='Survey Results(Experience Table)' onClick={this.handleItemClick.bind(this)} style={{color:'white'}} />
              </Menu.Menu>
              </Collapsible>
            </Menu.Item>
            <Divider></Divider>
            <Menu.Item name='report' style={{color:'white'}}>
              <Icon name='external' />
              <Icon name='caret right'/>
              {/* Reports */}
              <Collapsible trigger='Reports'>
              <Menu.Menu>
                <Menu.Item name='Report Answer(Category Base)' onClick={this.handleItemClick.bind(this)} style={{color:'white'}} />
                <Menu.Item name='Report Answer(Photo Name Base)' onClick={this.handleItemClick.bind(this)} style={{color:'white'}} />
                <Menu.Item name='Report Admin List' onClick={this.handleItemClick.bind(this)} style={{color:'white'}} />
              </Menu.Menu>
              </Collapsible>
            </Menu.Item>
            <Divider></Divider>
            <Menu.Item name='visualize' onClick={this.handleItemClick.bind(this)} style={{color:'white'}}>
              <Icon name='pie chart' />
              Visualize Results
            </Menu.Item>
            <Divider></Divider>
            <Menu.Item name='edit' onClick={this.handleItemClick.bind(this)} style={{color:'white'}}>
              <Icon name='edit' />
              Edit Content
            </Menu.Item>
            <Divider></Divider>
            <Menu.Item name='task' onClick={this.handleItemClick.bind(this)} style={{color:'white'}}>
              <Icon name='tasks' />
              Tasks
            </Menu.Item>
        </Menu>
      
      </Grid.Column>
        <Grid.Column stretched mobile={12} tablet={12} computer={12} largeScreen={12} widescreen={12}>
          {activeItem==='home'?
            <ErrorBoundry>
              <CoverPage/>
            </ErrorBoundry>:
            null}
          {activeItem==='List of Admins'?
            <ErrorBoundry>
              <AdminTablePage/>
            </ErrorBoundry>:
            null}
          {activeItem==='Edit Admin List'?
            <ErrorBoundry>  
              <AdminList/>
            </ErrorBoundry>:
            null}
          {activeItem==='Register New Admin'?
            <ErrorBoundry>
              <RegisterPage/>
            </ErrorBoundry>:
            null}
          {activeItem==='pollinator'?
            <ErrorBoundry>  
              <FillTable/>
            </ErrorBoundry>:
            null}
          {activeItem==='Survey Results(Answer Table)'?
            <ErrorBoundry>  
              <SurveyResultsPage/>
            </ErrorBoundry>:
            null}
          {activeItem==='Survey Results(Experience Table)'?
            <ErrorBoundry>  
              <SurveyResultsAnswerPage/>
            </ErrorBoundry>:
            null}
          {activeItem==='Report Answer(Category Base)'?
            <ErrorBoundry>  
              <ReportAnswerCategoryPage/>
            </ErrorBoundry>:
            null}
          {activeItem==='Report Answer(Photo Name Base)'?
              <ReportAnswerPhotoPage/>:
            null}
          {activeItem==='Report Admin List'?
            <ErrorBoundry>  
              <ReportAdminPage/>
            </ErrorBoundry>:
            null}
          {activeItem==='visualize'?
            <ErrorBoundry>
              <OptionMenuResults/>
            </ErrorBoundry>:
            null}
          {activeItem==='edit'?
            <Segment basic>
            </Segment>:
            null}
          {activeItem==='task'?
            <Segment basic>
            </Segment>:
            null}
          </Grid.Column>
        </Grid>
        </Segment>
      </div>
    );
  }
} 

// export default Page3;

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
      user,
      users
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };

HomePage.defaultProps = {
    visible: false,
    handleChange: () => {},
    handleItemClick: () => {},
    logoutClick: () => {},
    history: {}
  }

// prop checks
HomePage.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  logoutClick: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}
