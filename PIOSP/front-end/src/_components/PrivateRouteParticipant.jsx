import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRouteParticipant = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('token')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/permission', state: { from: props.location } }} />
    )} />
)