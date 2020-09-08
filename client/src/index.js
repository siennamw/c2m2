import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';

import registerServiceWorker from './registerServiceWorker';

import './styles/index.css';
import App from './components/App';
import { getAuthorizationToken, signOut } from './utils';

const httpLink = createUploadLink({
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
      if (message.toLowerCase().includes('authentication required')) {
        notAuthorized = true;
      }
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`,
      );
    });
  }
  if (networkError) {
    if (networkError.statusCode === 401) {
      notAuthorized = true;
    }
  }
  if (notAuthorized) signOut();
});

const client = new ApolloClient({
  link: authLink.concat(errorLink.concat(httpLink)),
  cache: new InMemoryCache(),
  connectToDevTools: true,
  token: 'apollo-token',
  onError: errorLink,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);
registerServiceWorker();
