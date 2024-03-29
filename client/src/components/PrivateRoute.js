/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, useLocation } from 'react-router-dom';

import { AuthContext } from './AuthContext';

const PrivateRoute = ({
  component: Component,
  path,
  ...rest
}) => {
  const { authenticated, refreshAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    // re-check authentication on every location change
    refreshAuthenticated();
  }, [location, refreshAuthenticated]);

  return (
    <Route
      {...rest}
      path={path}
      render={(props) => (
        authenticated
          ? <Component {...props} />
          : (
            <Redirect to={{
              pathname: '/sign-in',
              state: { from: location.pathname },
            }}
            />
          )
      )}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  path: PropTypes.string.isRequired,
};

export default PrivateRoute;
