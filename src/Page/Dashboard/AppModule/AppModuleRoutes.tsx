import React from 'react';
import { Route } from 'react-router-dom';
import { appModuleRoutes } from '../../../Lib/Routes/AppModuleRoutes';

const AppModulesList = React.lazy(() => import('./AppModulesList'));

export const AppModuleRoutesConfig = [
  <Route key='AppModule'>
    <Route path={appModuleRoutes.list.path} element={<AppModulesList />} />
  </Route>,
];
