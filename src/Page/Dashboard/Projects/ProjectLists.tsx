import React, { useEffect, useState } from 'react';
import { Button, Menu, Table, rem } from '@mantine/core';
import { useLazyQuery } from '@apollo/client';
import { ProjectList } from './graphql/projectList.query';
import { ProjectsQuery } from 'gql/graphql';
import { useNavigate } from 'react-router-dom';
import { projectRoutes } from 'Lib/Routes/ProjectRoutes';
import PageTitleComponent from 'Components/PageTitle/PageTitleComponent';
import { notifications } from '@mantine/notifications';
import { IconEdit, IconTrash, IconViewfinder } from '@tabler/icons-react';
import ContentFrame from 'Components/ContentFrame';

export default function ProjectLists() {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState<ProjectsQuery>();

  const [getProjects] = useLazyQuery(ProjectList, {
    onCompleted: d => {
      setProjectList(d);
    }, 
    onError: (e) => notifications.show({
      color: 'red',
      message: e.message
    })
  });

  useEffect(() => {
    getProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContentFrame>
        <PageTitleComponent 
        title='List of Projects' 
        additionalButton={true} 
        onClick={() => navigate(projectRoutes.create.fullPath)}
        buttonText='Add projects' />
      <Table.ScrollContainer minWidth={500} type="native">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th style={{ width: '80px' }}>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {projectList?.projects?.data.map((row) => (
            <Table.Tr key={row.id}>
              <Table.Td className='capitalize'>{row.attributes?.name}</Table.Td>
              <Table.Td>{row.attributes?.status}</Table.Td>
              <Table.Td>
              <Menu
                  shadow='md'
                  width={200}
                  position='bottom-end'>
                  <Menu.Target>
                    <Button
                      size='xs'
                      variant='light'>
                      ...
                    </Button>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() => navigate(projectRoutes.update.fullPath({ projectId: String(row.id) }))}
                      leftSection={
                        <IconEdit
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }>
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => navigate(projectRoutes.project.fullPath({ projectId: String(row.id) }))}
                      leftSection={
                        <IconViewfinder
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }>
                        View
                    </Menu.Item>
                    <Menu.Item
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
    </Table.ScrollContainer>
    </ContentFrame>
  )
}
