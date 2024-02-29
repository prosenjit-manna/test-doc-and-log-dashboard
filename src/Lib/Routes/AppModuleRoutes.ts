import { dashboardRoutes } from './DashboardRoutes';
import queryString from 'query-string';


const appModulesUrl = 'app-module';

export const appModuleRoutes = {
  matchPath: `${dashboardRoutes.path}/${appModulesUrl}`,
  list: {
    path: `${appModulesUrl}-list`,
    fullPath: `${dashboardRoutes.path}/${appModulesUrl}-list`,
    build: (query: any) =>
      `${dashboardRoutes.path}/${appModulesUrl}-list?${queryString.stringify(query)}`,
  },
  module: {
    path: `${appModulesUrl}/:moduleId`,
    fullPath: ({ moduleId }: any) => `${dashboardRoutes.path}/${appModulesUrl}/${moduleId}`,
  },
};