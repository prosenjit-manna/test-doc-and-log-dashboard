import React from 'react';
import routes from 'Lib/Routes/Routes';
import MenuLink from './MenuLink';
import { projectRoutes } from 'Lib/Routes/ProjectRoutes';
import { appModuleRoutes } from 'Lib/Routes/AppModuleRoutes';

export default function SidebarComponent() {
  return (
    <div 
      className='flex flex-col sm:flex-row sm:justify-around' 
      data-test-id="dashboard-sidebar">
      <div className='w-72 h-screen'>
        <div className='flex items-center justify-start mx-6 mt-10'>
          <span className='text-gray-600  ml-4 text-2xl font-bold'>
            Better QA
          </span>
        </div>
        <nav className='mt-10 px-6 '>
          <MenuLink
            text='Modules'
            activeMenuPaths={appModuleRoutes.matchPath}
            link={appModuleRoutes.list.fullPath}
          />

          <MenuLink
            text='Projects'
            activeMenuPaths={projectRoutes.projectMatchingPath}
            link={projectRoutes.list.fullPath}
          />

          <MenuLink
            text='Profile'
            activeMenuPaths={routes.dashboard.me.path}
            link={routes.dashboard.me.path}
          />

          <MenuLink
            text='Logout'
            link={routes.logout.path}
          />
          
        </nav>
      </div>
    </div>
  );
}
