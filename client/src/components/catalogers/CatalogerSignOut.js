import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

import { AuthContext } from '../AuthContext';
import { signOut } from '../../utils';

const CatalogerSignOut = () => {
  const [err, setErr] = useState(null);
  const client = useApolloClient();
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await client.resetStore();
        signOut();
        setAuthenticated(false);
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
