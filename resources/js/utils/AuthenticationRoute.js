import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useStore } from 'easy-peasy';

const AuthenticationRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useStore(state => state.auth.isAuthenticated);
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

AuthenticationRoute.propTypes = {};

export default AuthenticationRoute;
