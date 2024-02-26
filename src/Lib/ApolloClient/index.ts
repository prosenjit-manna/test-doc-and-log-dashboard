import {
  ApolloClient,
  InMemoryCache,
  from
} from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { localStore } from 'Lib/Api/LocalStore';
import appConfig from 'Lib/appConfig';

const httpLink = new BatchHttpLink({
  uri: appConfig.api.graphql,
  batchMax: 2,
  batchInterval: 400,
  batchDebounce: true,
});

const authLink = setContext((_, { headers }) => {
  const appData =  localStore.get();

  const customHeaders =  {
    ...headers,
    authorization: appData.token ? `Bearer ${appData.token}` : '',
  };

  
  return {
    headers: {
      ...headers,
      ...customHeaders
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  forward(operation);
});


export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

