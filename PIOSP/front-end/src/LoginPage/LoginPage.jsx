import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import '../components/stylesheets/Login.css';
import {Segment} from 'semantic-ui-react';

// login page 
// user credential will go through action in redux 
class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            email: '',
            password: '',
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        const { dispatch } = this.props;
        if (email && password) {
            dispatch(userActions.login(email, password));
        }
    }
    

    render() {
        const { loggingIn } = this.props;
        const { email, password, submitted } = this.state;
        return (
            <div >
              <Segment style={{paddingTop:"10px", background: 'url("/img/wallpaper.wiki-Cool-nature-backgrounds1.jpg")center center', height:'100vh'}}>
                <h1 className="h1Login" >Login</h1>
                    <div className="login-maintag">
                    <div style={{ minWidth: 500}}>
                        <div className="semi_arc e6">
                        <div className="semi_arc_3 e5_1">
                            <div className="semi_arc_3 e5_2">
                            <div className="semi_arc_3 e5_3">
                                <div className="semi_arc_3 e5_4">
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="core"></div>
                        </div>
                    </div>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                        <input type="email" className="form-control-login" name="email" value={email} onChange={this.handleChange} placeholder="Email"/>
                        {submitted && !email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <input type="password" className="form-control-login" name="password" value={password} onChange={this.handleChange} placeholder="Password"/>
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                        <button type="submit" className="submit-login">
                            {loggingIn &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="  alt=""/>
                            }
                        Login</button>
                        <div className="shadow"></div>                    
                </form>
                </div>
              </Segment>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 

LoginPage.defaultProps = {
    loggingIn: false,
    dispatch: () => {},
    handleSubmit: () => {},
    handleChange: () => {},
  }

LoginPage.propTypes = {
    loggingIn: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
}