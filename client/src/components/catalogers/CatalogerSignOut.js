import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';

import { AuthContext } from '../App';
import { signOut } from '../../utils';

const CatalogerSignOut = () => {
  const [err, setErr] = useState(null);
  const client = useApolloClient();
  const {
    authenticated,
    setAuthenticated,
    setId,
    setAdmin,
  } = useContext(AuthContext);

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await client.resetStore();
        signOut();
        setAdmin(false);
        setAuthenticated(false);
        setId(null);
      } catch (error) {
        setErr(error);
        console.log('Error signing out', error);
      }
    };

    handleSignOut();
  });

  if (err) {
    return (
      <div>
        <h3>Error Signing Out</h3>
        <p>{err}</p>
      </div>
    );
  }

  if (authenticated) return <h3>Signing out...</h3>;

  return <Redirect to="/" />;
};

export default CatalogerSignOut;
