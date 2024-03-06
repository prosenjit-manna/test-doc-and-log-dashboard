import { projectRoutes } from "Lib/Routes/ProjectRoutes";
import React from "react";
import { Route } from "react-router-dom";

const ProjectList = React.lazy(() => import('Page/Dashboard/Projects/ProjectLists'));
const ProjectForm = React.lazy(() => import('Page/Dashboard/Projects/ProjectForm'));
const Project = React.lazy(() => import('Page/Dashboard/Projects/ProjectDetail'));

export const ProjectRoutes = [
  <Route key='ProjectRoutes'>
    <Route path={projectRoutes.list.path} element={<ProjectList />} />
    <Route path={projectRoutes.create.path} element={<ProjectForm />} />
    <Route path={projectRoutes.update.path} element={<ProjectForm />} />
    <Route path={projectRoutes.project.path} element={<Project />} />
  </Route>
];