import React, { useEffect, useState } from 'react';
import { Table, Button } from '@mantine/core';
import { useLazyQuery } from '@apollo/client';
import { ProjectList } from '../graphql/projectList.query';
import { ProjectsQuery } from 'gql/graphql';
import { useNavigate } from 'react-router-dom';
import { projectRoutes } from 'Lib/Routes/ProjectRoutes';

export default function ProjectLists() {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState<ProjectsQuery>();

  const [getProjects] = useLazyQuery(ProjectList, {
    onCompleted: d => {
      setProjectList(d);
    }
  });

  useEffect(() => {
    getProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className='p-5'>
      <div className='flex flex-col sm:flex-row sm:items-center'>
        <h1 className='flex-1'>List of Projects</h1>
        <Button variant="filled" onClick={() => navigate(projectRoutes.create.fullPath)}>Add projects</Button>
      </div>
      <Table.ScrollContainer minWidth={500} type="native">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {projectList?.projects?.data.map((row) => (
            <Table.Tr key={row.id}>
              <Table.Td>{row.attributes?.name}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
    </div>
  )
}
