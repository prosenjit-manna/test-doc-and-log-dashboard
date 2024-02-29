import { useQuery } from '@apollo/client';
import React from 'react';
import { appModuleListQuery } from './graphql/appModuleList.query';
import { Button, Menu, Table, Title, rem } from '@mantine/core';
import {
  IconTrash,
  IconEdit,
  IconTextPlus,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { appModuleRoutes } from 'Lib/Routes/AppModuleRoutes';

export default function AppModule() {
  const data = useQuery(appModuleListQuery);

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
          {data?.data?.appModules?.data.map((element) => (
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
                    <Menu.Item
                      leftSection={
                        <IconEdit style={{ width: rem(14), height: rem(14) }} />
                      }>
                        <Link className='block' to={appModuleRoutes.module.fullPath({ moduleId: element.id as string })}>
                      Edit
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      leftSection={
                        <IconTextPlus
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }>
                      Test Cases
                    </Menu.Item>

                    <Menu.Item
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
