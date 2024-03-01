import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { appModuleListQuery } from './graphql/appModuleList.query';
import { Button, Menu, Table, Title, rem } from '@mantine/core';
import {
  IconTrash,
  IconEdit,
  IconTextPlus,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { appModuleRoutes } from 'Lib/Routes/AppModuleRoutes';
import { deleteAppModuleMutation } from './graphql/deleteAppModule.mutation';
import { notifications } from '@mantine/notifications';
import { AppModulesQuery } from 'gql/graphql';
import { cloneDeep } from 'lodash';

export default function AppModule() {
  const [modules, setModules] = useState<AppModulesQuery>(); 
  useQuery(appModuleListQuery, {
    onCompleted: (d) => {
      setModules(d)
    }
  });
  const [deleteCallBack ] = useMutation(deleteAppModuleMutation);

  const deleteModule = (id: string) => {
    deleteCallBack({
      variables: {
        id
      },
      onCompleted: () => {
       notifications.show({ message: 'Deleted' });
       const d = cloneDeep(modules);
       if (d?.appModules) {
        d.appModules.data = d?.appModules?.data.filter(e => e.id !== id);
        setModules(d);
       }
      }
    })
  }

  return (
    <div className='p-4 bg-white shadow rounded-lg w-full text-left'>
      <div className='flex items-center place-content-between'>
        <Title order={1}>App Modules</Title>
        <Link to={appModuleRoutes.moduleAdd.fullPath()}>
        <Button size='xs' variant='light'>Add</Button>
        </Link>
        
      </div>
      
      <Table className='mt-10'>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th style={{ width: '100px' }}>#</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {modules?.appModules?.data.map((element) => (
            <Table.Tr key={element.id}>
              <Table.Td>{element.attributes?.title}</Table.Td>
              <Table.Td>
                <Menu
                  shadow='md'
                  width={200}>
                  <Menu.Target>
                    <Button size='xs' variant="light">...</Button>
                  </Menu.Target>

                  <Menu.Dropdown>
                  <Link  to={appModuleRoutes.module.fullPath({ moduleId: element.id as string })}>
                    <Menu.Item
                      leftSection={
                        <IconEdit style={{ width: rem(14), height: rem(14) }} />
                      }>
                        
                      Edit
                     
                    </Menu.Item>
                    </Link>
                    <Menu.Item
                      leftSection={
                        <IconTextPlus
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }>
                      Test Cases
                    </Menu.Item>

                    <Menu.Item
                      onClick={() => deleteModule(element.id as string)}
                      color='red'
                      leftSection={
                        <IconTrash
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }>
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}
