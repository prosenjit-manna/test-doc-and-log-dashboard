import React from 'react';
import { Route } from 'react-router-dom';
import { appModuleRoutes } from '../../../Lib/Routes/AppModuleRoutes';


const AppModulesList = React.lazy(() => import('./AppModulesList'));
const AppModule = React.lazy(() => import('./AppModule'));

export const AppModuleRoutesConfig = [
  <Route key='AppModule'>
    <Route path={appModuleRoutes.list.path} element={<AppModulesList />} />
    <Route path={appModuleRoutes.moduleAdd.path} element={<AppModule />} />
    <Route path={appModuleRoutes.module.path} element={<AppModule />} />
  </Route>,
];
