import { dashboardRoutes } from "./DashboardRoutes";
import queryString from 'query-string';

export interface ProjectRouteParams { 
  projectId: string | number
}

export interface ProjectListRouteQuery { 
  page?: number | string;
}

export const projectRoutes = {
  projectMatchingPath: `${dashboardRoutes.path}/projects`,
  list: {
    path: 'projects-list',
    fullPath: `${dashboardRoutes.path}/projects-list`,
    build: (query: ProjectListRouteQuery) =>
      `${dashboardRoutes.path}/projects-list?${queryString.stringify(query)}`,
  },
  post: {
    path: 'projects/:projectId',
    fullPath: ({ projectId }: ProjectRouteParams) => `${dashboardRoutes.path}/projects/${projectId}`,
  },
};