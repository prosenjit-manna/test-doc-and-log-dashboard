import { QueryParams } from 'Lib/Hooks/queryParams.interface';
import { dashboardRoutes } from './DashboardRoutes';
import queryString from 'query-string';


const appModulesUrl = 'app-module';

export interface AppModuleRoute { moduleId: string; }
export interface AppModuleListRoute extends QueryParams { 
  page: string;
}

export const appModuleRoutes = {
  matchPath: `${dashboardRoutes.path}/${appModulesUrl}`,
  list: {
    path: `${appModulesUrl}-list`,
    fullPath: `${dashboardRoutes.path}/${appModulesUrl}-list`,
    build: (query: AppModuleListRoute) =>
      `${dashboardRoutes.path}/${appModulesUrl}-list?${queryString.stringify(query)}`,
  },
  module: {
    path: `${appModulesUrl}/:moduleId`,
    fullPath: ({ moduleId }: AppModuleRoute ) => `${dashboardRoutes.path}/${appModulesUrl}/${moduleId}`,
  },
  moduleAdd: {
    path: `${appModulesUrl}-add`,
    fullPath: () => `${dashboardRoutes.path}/${appModulesUrl}-add`,
  },
};