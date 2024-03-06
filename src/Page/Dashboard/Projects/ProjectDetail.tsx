import { useLazyQuery } from '@apollo/client';
import ContentFrame from 'Components/ContentFrame'
import PageTitleComponent from 'Components/PageTitle/PageTitleComponent'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { projectEntity } from './graphql/project.query';
import { Project } from 'gql/graphql';
import { notifications } from '@mantine/notifications';
import { projectRoutes } from 'Lib/Routes/ProjectRoutes';

export default function ProjectDetail() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState<Project>();
  const [getProjectDetail] = useLazyQuery(projectEntity, {
    onCompleted: (d) => d.project?.data?.attributes && setProject(d.project.data.attributes),
    onError: (e) => notifications.show({
      color: 'red',
      message: e.message
    })
  });

  useEffect(() => {
    getProjectDetail({
      variables: {
        projectId: projectId
      }
    });
  }, []);

  return (
    <ContentFrame>
      <PageTitleComponent title='Project Details' additionalButton={true} 
      buttonText='Edit' 
      onClick={() => navigate(projectRoutes.update.fullPath({ projectId: String(projectId) }))} />
      <div>
        <p><b>Name: </b>{project?.name}</p>
        <p><b>Description: </b>{project?.descriptions}</p>
        <p><b>Status: </b>{project?.status}</p>
      </div>
    </ContentFrame>
  )
}
