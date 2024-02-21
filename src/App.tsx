import React from 'react';
import { Notifications } from '@mantine/notifications';
import ScrollToTop from './Components/ScrollToTop';
import TrackRedirectLinks from './Components/TrackRedirectLinks';

import { MantineProvider } from '@mantine/core';
import AppRoutes from './Lib/Routes/AppRoutes';

function App() {
  return (
    <div className='App'>
      <MantineProvider>
        <ScrollToTop />
        <TrackRedirectLinks />
        <Notifications position='top-right' />
        <AppRoutes />
      </MantineProvider>
    </div>
  );
}

export default App;
