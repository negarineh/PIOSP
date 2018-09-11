import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Router } from 'react-router-dom';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { history } from './_helpers';
import { alertActions } from './_actions';
import { PrivateRoute } from './_components';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import {PrivateRouteParticipant} from './_components';

import { LoginPageParticipant } from './LoginPageParticipant';

import Page2 from './components/Survey/Page2';
import Survey from './components/Survey/Survey';
import Welcome from './components/Survey/Welcome';
import Submit from './components/Survey/Submit';
import Finish from './components/Survey/Finish';

import {PermissionPage} from './PermissionPage';
import {InhibitorPage} from './PermissionPage';
import {MainPage} from './MainPage';
import ErrorBoundry from './ErrorBoundry/ErrorBoundry';
import {ParticipantSignUpPendingPage} from './ParticipantSignUpPendingPage';
import { HomePageSubAdmin } from './HomePage';

// all routes define here and usin redux for proper message 
class App extends Component {

  constructor(props) {
    super(props);

      const { dispatch } = this.props;
      history.listen((location, action) => {
          // clear alert on location change
          dispatch(alertActions.clear());
      });
    }

  render() {
    const { alert } = this.props;
    return (
      <div className="App">
        <BrowserRouter>  
          <div> 
            <ErrorBoundry><Route exact path="/" component={MainPage}/></ErrorBoundry>
          </div>
        </BrowserRouter>
        <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <ErrorBoundry><PrivateRoute exact path="/home" component={HomePage} /></ErrorBoundry>
                                <ErrorBoundry><PrivateRoute exact path="/homeAdmin" component={HomePageSubAdmin}/> </ErrorBoundry>
                                <ErrorBoundry><Route path="/login" component={LoginPage} /></ErrorBoundry>
                                <ErrorBoundry><PrivateRouteParticipant path="/welcome" component={Welcome} /></ErrorBoundry>
                                <ErrorBoundry><Route path="/LoginPageParticipant" component={LoginPageParticipant} /></ErrorBoundry>
                                <ErrorBoundry><Route  path="/page2" component={Page2}/></ErrorBoundry>
                                <ErrorBoundry><PrivateRouteParticipant  path="/survey" component={Survey}/></ErrorBoundry>
                                <ErrorBoundry><PrivateRouteParticipant  path="/submit" component={Submit}/></ErrorBoundry>
                                <ErrorBoundry><Route path='/ParticipantSignUpPending' component={ParticipantSignUpPendingPage}/></ErrorBoundry>
                                <ErrorBoundry><Route  path="/finish" component={Finish}/></ErrorBoundry>
                                <ErrorBoundry><Route  path="/permission" component={PermissionPage}/></ErrorBoundry>
                                <ErrorBoundry><Route  path="/inhibitor" component={InhibitorPage}/></ErrorBoundry>
                                <ErrorBoundry><Route  path="/mainpage" component={MainPage}/></ErrorBoundry>
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
      alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 

App.defaultProps = {
    alert: {},
    dispatch: () => {},
}

App.propTypes ={
    dispatch: PropTypes.func.isRequired,
    alert: PropTypes.object.isRequired,
}

// export default App;
