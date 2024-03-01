import { projectRoutes } from "Lib/Routes/ProjectRoutes";
import React from "react";
import { Route } from "react-router-dom";

const ProjectList = React.lazy(() => import('Page/Dashboard/Projects/ProjectLists/ProjectLists'));

export const ProjectRoutes = [
  <Route key='ProjectRoutes'>
    <Route path={projectRoutes.list.path} element={<ProjectList />} />
  </Route>
];