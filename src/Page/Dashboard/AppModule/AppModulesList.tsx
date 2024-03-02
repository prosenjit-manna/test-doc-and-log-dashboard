import React from 'react';
import {
  Button,
  Menu,
  Modal,
  Pagination,
  Table,
  Title,
  rem,
} from '@mantine/core';
import { IconTrash, IconEdit, IconTextPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { appModuleRoutes } from 'Lib/Routes/AppModuleRoutes';
import useAppModule from './useAppModule';

export default function AppModule() {
  const {
    modules,
    query,
    pageChange,
    deleteModule,
    deleteConfirmationOpended,
    openDeleteConfirmation,
    closeDeleteConfirmation,
  } = useAppModule();

  return (
    <div className='p-4  w-full text-left'>
      <div className='flex items-center place-content-between'>
        <Title order={1}>App Modules</Title>
        <Link to={appModuleRoutes.moduleAdd.fullPath()}>
          <Button
            size='xs'
            variant='light'>
            Add
          </Button>
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
                    <Button
                      size='xs'
                      variant='light'>
                      ...
                    </Button>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Link
                      to={appModuleRoutes.module.fullPath({
                        moduleId: element.id as string,
                      })}>
                      <Menu.Item
                        leftSection={
                          <IconEdit
                            style={{ width: rem(14), height: rem(14) }}
                          />
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
                      onClick={openDeleteConfirmation}
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
                <Modal
                  opened={deleteConfirmationOpended}
                  onClose={closeDeleteConfirmation}
                  title='Are you sure you want to delete?'>
                  <Title size='h5'>
                    Your content can not be recovered once you delete.
                  </Title>

                  <Button
                    onClick={() => deleteModule(element.id as string)}
                    className='mt-2 '>
                    Confirm
                  </Button>
                </Modal>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {Number(modules?.appModules?.meta?.pagination?.pageCount) > 1 && (
        <Pagination
          total={modules?.appModules?.meta.pagination.pageCount}
          value={Number(query.page)}
          onChange={pageChange}
        />
      )}
    </div>
  );
}
