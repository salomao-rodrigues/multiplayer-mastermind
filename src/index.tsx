import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';

import './index.scss';

import App from './App';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      credentials: 'include',
      uri: 'http://localhost:4000/graphql'
    })
  ]),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={ client }>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister(); // No need for offline capabilities
