import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getAuthorizationTokenData, isAuthenticated } from '../utils';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const tokenData = getAuthorizationTokenData();

  const [admin, setAdmin] = useState(tokenData ? tokenData.admin : false);
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [id, setId] = useState(tokenData ? tokenData.id : null);

  useEffect(() => {
    const authTokenData = getAuthorizationTokenData();
    setAdmin(tokenData ? authTokenData.admin : false);
    setId(tokenData ? authTokenData.id : false);
  }, [authenticated]);

  return (
    <AuthContext.Provider
      value={{
        admin,
        authenticated,
        id,
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
