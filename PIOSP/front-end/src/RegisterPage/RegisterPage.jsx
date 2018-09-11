import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import '../components/stylesheets/Login.css';

import {Icon, Segment, Form, Message} from 'semantic-ui-react';

// render register page and admin can register sub admins
class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '', 
                email: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        }); 
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.username && user.email && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { user, submitted } = this.state;
        return (
            <div>
                <Segment padded style={{height:'638.5px'}}>
                    <Form style={{ background: 'beige', padding:'20px'}} onSubmit={this.handleSubmit}>
                        <Message
                        positive
                        header='Register New Admin'
                        content="You can register new Admin here. This Admin will be sub Admin and do not have access to Admin part."
                        style={{textAlign:'left'}}
                        />
                        <Form.Group unstackable inline widths={4} >
                            <div>
                                <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                                    <Form.Field>
                                        <Icon name='user' color='teal'/>
                                        <input type="text" className="form-control-register" name="username" value={user.username} onChange={this.handleChange} placeholder="Username" />
                                        {submitted && !user.username &&
                                            <div className="help-block">Username is required</div>
                                        }
                                    </Form.Field>
                                </div>
                                <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                                    <Form.Field>
                                        <Icon name='mail' color='teal'/>
                                            <input type="email" className="form-control-register" name="email" value={user.email} onChange={this.handleChange} placeholder="Email"/>
                                            {submitted && !user.email &&
                                                <div className="help-block">Email is required</div>
                                            }
                                    </Form.Field>
                                </div>
                                <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                                    <Form.Field>
                                        <Icon name='privacy' color='teal'/>
                                            <input type="password" className="form-control-register" name="password" value={user.password} onChange={this.handleChange} placeholder="Password"/>
                                            {submitted && !user.password &&
                                                <div className="help-block">Password is required</div>
                                            }
                                    </Form.Field>
                                </div>
                            
                                <div className="form-group" >
                                        <button type="submit" className="submit-register">
                                        {user.name && user.email && user.password && submitted &&
                                            <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }
                                        Signup
                                        </button>                    
                                </div>
                            </div>
                        </Form.Group>
                    </Form>
                </Segment>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };

RegisterPage.defaultProps = {
    user: {},
    dispatch: () => {},
    handleChange: () => {},
    handleSubmit: () => {}
}

// prop checks
RegisterPage.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}
