import React, { useEffect, useState } from 'react';
import { Button, Menu, Modal, Pagination, Table, rem } from '@mantine/core';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ProjectList } from './graphql/projectList.query';
import { ProjectEntity, ResponseCollectionMeta } from 'gql/graphql';
import { useNavigate } from 'react-router-dom';
import { projectRoutes } from 'Lib/Routes/ProjectRoutes';
import PageTitleComponent from 'Components/PageTitle/PageTitleComponent';
import { notifications } from '@mantine/notifications';
import { IconEdit, IconTrash, IconViewfinder } from '@tabler/icons-react';
import ContentFrame from 'Components/ContentFrame';
import { useDisclosure } from '@mantine/hooks';
import { deleteProject } from './graphql/deleteProject.mutation';
import appConfig from 'Lib/appConfig';

export default function ProjectLists() {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState<ProjectEntity[]>();
  const [deleteModalOpened, { open, close }] = useDisclosure(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectMeta, setProjectMeta] = useState<ResponseCollectionMeta>();

  const [getProjects] = useLazyQuery(ProjectList, {
    onCompleted: d => {
      setProjectList(d.projects?.data);
      setProjectMeta(d.projects?.meta);
    }, 
    onError: (e) => notifications.show({
      color: 'red',
      message: e.message
    })
  });

  const [deleteProjectItem] = useMutation(deleteProject, {
    onCompleted: (d) => {
      if (d) {
        const filteredList = projectList?.filter(f => f.id !== d.deleteProject?.data?.id);
        setProjectList(filteredList);
        close();
      }
    }
  });

  useEffect(() => {
    getProjects({
      variables: {
        pagination: {
          page: currentPage,
          pageSize: appConfig.pagination.pageSize
        }
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

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
          {projectList?.map((row) => (
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
                      onClick={open}
                      leftSection={
                        <IconTrash
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }>
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
                <Modal
                  opened={deleteModalOpened}
                  onClose={close}
                  title='Are you sure you want to delete?'>
                  
                  <Button
                    onClick={() => deleteProjectItem({
                      variables: {
                        deleteProjectId: String(row.id)
                      }
                    })}
                    className='mt-2 '>
                    Confirm
                  </Button>
                </Modal>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
    {projectMeta && projectMeta?.pagination.pageCount > 1 && (
      <Pagination
        total={projectMeta?.pagination.pageCount || 0}
        value={currentPage}
        onChange={(prev) => {
          setCurrentPage(prev);
          navigate(projectRoutes.list.build({ page: prev }));
        }}
      />
    )}
    </ContentFrame>
  )
}
