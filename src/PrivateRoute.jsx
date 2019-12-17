import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authUser, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => (sessionStorage.user ? <Component {...props} /> : <Redirect to="/login" />)}
        />
    );
};

export default PrivateRoute;
