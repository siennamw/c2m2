import React from 'react';

import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';

import { getAuthorizationToken, signOut } from '../utils';

const uploadLink = createUploadLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = getAuthorizationToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  let notAuthorized = false;
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`,
      );
      if (message.toLowerCase().includes('authentication required')) {
        notAuthorized = true;
      }
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    if (networkError.statusCode === 401) {
      notAuthorized = true;
    }
  }
  if (notAuthorized) {
    signOut();
  }
});

const link = ApolloLink.from([
  errorLink,
  authLink,
  uploadLink,
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link,
});

const ApolloContext = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloContext;
