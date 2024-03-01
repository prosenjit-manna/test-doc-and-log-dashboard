import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import routes from '../Routes/Routes';
import { useAppSelector } from '../Store/hooks';

export  function AuthGuard() {
  const token = useAppSelector(state => state.user.token);

  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to={routes.login.path} />;
  }
}