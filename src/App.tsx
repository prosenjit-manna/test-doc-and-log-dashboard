import React from 'react';
import { Notifications } from '@mantine/notifications';
import ScrollToTop from './Components/ScrollToTop';
import TrackRedirectLinks from './Components/TrackRedirectLinks';

import { MantineProvider } from '@mantine/core';
import AppRoutes from './Lib/Routes/AppRoutes';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from 'Lib/ApolloClient';

import '@mantine/notifications/styles.css';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <MantineProvider>
        <Notifications position='top-right'  />

        <div className='App'>
          <ScrollToTop />
          <TrackRedirectLinks />
          <AppRoutes />
        </div>
      </MantineProvider>
    </ApolloProvider>
  );
}

export default App;
