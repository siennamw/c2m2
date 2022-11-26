import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useApolloClient } from '@apollo/client';

import { getAuthorizationTokenData, isAuthenticated } from '../utils';

export const AuthContext = createContext({
  admin: false,
  authenticated: false,
  id: null,
  refreshAuthenticated: () => {},
  setAuthenticated: () => {},
});

const AuthContextProvider = ({ children }) => {
  const client = useApolloClient();

  const tokenData = getAuthorizationTokenData();

  const [admin, setAdmin] = useState(tokenData ? tokenData.admin : false);
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [id, setId] = useState(tokenData ? tokenData.id : null);

  useEffect(() => {
    const authTokenData = getAuthorizationTokenData();
    setAdmin(authTokenData ? authTokenData.admin : false);
    setId(authTokenData ? authTokenData.id : false);
  }, [authenticated]);

  useEffect(() => {
    // if user is not authenticated,
    // clear Apollo store and refetch active queries
    if (!authenticated) client.resetStore();
  }, [authenticated, client]);

  const refreshAuthenticated = () => {
    // re-check if user token exists in storage
    setAuthenticated(isAuthenticated());
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        authenticated,
        id,
        refreshAuthenticated,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AuthContextProvider;
