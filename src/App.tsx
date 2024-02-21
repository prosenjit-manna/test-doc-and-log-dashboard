import React from 'react';
import { Notifications } from '@mantine/notifications';
import ScrollToTop from './Components/ScrollToTop';
import TrackRedirectLinks from './Components/TrackRedirectLinks';

import { MantineProvider } from '@mantine/core';
import AppRoutes from './Lib/Routes/AppRoutes';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from 'Lib/ApolloClient';


function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <div className='App'>
        <MantineProvider>
          <ScrollToTop />
          <TrackRedirectLinks />
          <Notifications position='top-right' />
          <AppRoutes />
        </MantineProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;
