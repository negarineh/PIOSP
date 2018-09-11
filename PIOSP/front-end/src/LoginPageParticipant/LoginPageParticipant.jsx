import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import '../components/stylesheets/Login.css';

// this component using jwt in action function and 
// in action we check the json web token make sure participant is authenticated to atthend the survey
class LoginPageParticipant extends React.Component {

    componentDidMount() {
        this.props.dispatch(userActions.attend());
    }
    
    render() {
        return (
            <div >
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

const connectedLoginPage = connect(mapStateToProps)(LoginPageParticipant);
export { connectedLoginPage as LoginPageParticipant }; 

LoginPageParticipant.defaultProps = {
    dispatch: () => {}
}

LoginPageParticipant.proptypes = {
    dispatch: PropTypes.func.isRequired
}