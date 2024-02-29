import { Title } from '@mantine/core';
import { AppModuleRoute } from 'Lib/Routes/AppModuleRoutes'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function AppModule() {
  const params: AppModuleRoute = useParams() as any;

  return (
    <div className='p-4'>
      <Title order={1}>Module {params?.moduleId ? 'Edit': 'Add'}</Title>
     

    </div>
  )
}
