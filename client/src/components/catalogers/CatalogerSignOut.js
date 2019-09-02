import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';

import { isAuthenticated, signOut } from '../../utils';

const CatalogerSignOut = () => {
  const [err, setErr] = useState(null);
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  const client = useApolloClient();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await client.resetStore();
      } catch (error) {
        setErr(error);
        console.log('Error signing out', error);
      }
    };

    handleSignOut();
    signOut();
    setAuthenticated(isAuthenticated());
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
