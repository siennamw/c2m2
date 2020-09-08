/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from './AuthContext';

const PrivateRoute = ({
  component: Component,
  location,
  path,
  ...rest
}) => {
  const { authenticated } = useContext(AuthContext);

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
              state: { from: location },
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
  location: PropTypes.string,
  path: PropTypes.string.isRequired,
};

PrivateRoute.defaultProps = {
  location: '/',
};

export default PrivateRoute;
