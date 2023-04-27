import React from 'react';
import { Route, Redirect, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAuthenticated ? (
            <Component {...props} />
        ) : (
            <Navigate to={{
                pathname: '/',
                state: { from: props.location }
            }} />
        )
    )} />
);

export default PrivateRoute;