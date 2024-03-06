import { useLazyQuery, useMutation } from '@apollo/client';
import { Button, Select } from '@mantine/core';
import { Enum_Project_Status, ProjectInput } from 'gql/graphql';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { createProject } from './graphql/createProject.mutation';
import { useNavigate, useParams } from 'react-router-dom';
import { projectRoutes } from 'Lib/Routes/ProjectRoutes';
import { updateProject } from './graphql/updateProject.mutation';
import PageTitleComponent from 'Components/PageTitle/PageTitleComponent';
import { notifications } from '@mantine/notifications';
import ContentFrame from 'Components/ContentFrame';
import { projectEntity } from './graphql/project.query';

export default function ProjectForm() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm<ProjectInput>();

  const statusList = Object.values(Enum_Project_Status);

  const [projectCreate, {loading: createLoader }] = useMutation(createProject, {
    onCompleted: (d) => {
      notifications.show({ message: 'Project is created' });
      if (d.createProject?.data?.id) {
        navigate(projectRoutes.update.fullPath({ projectId: String(d.createProject.data.id) }));
      }
    }, onError: (e) => notifications.show({
      color: 'red',
      message:  e.message
    })
  }); 

  const [getProjectDetail] = useLazyQuery(projectEntity, {
    onCompleted: (d) => {
      if (d) {
        setValue('name', d.project?.data?.attributes?.name);
        setValue('descriptions', d.project?.data?.attributes?.descriptions);
        setValue('status', d.project?.data?.attributes?.status);
      }
    },
    onError: (e) => notifications.show({
      color: 'red',
      message: e.message
    })
  });

  const [projectUpdate, { loading: updateLoader }] = useMutation(updateProject, {
    onCompleted: (d) => {
      notifications.show({ message: 'Project is updated' });
      if (d.updateProject?.data?.id) {
        navigate(projectRoutes.update.fullPath({ projectId: String(d.updateProject.data.id) }));
      }
    }, onError: (e) => notifications.show({
      color: 'red',
      message:  e.message
    })
  });

  const onSubmit = (data: ProjectInput) => {
    const variable: ProjectInput = {
      name: data.name,
      descriptions: data.descriptions,
      status: data.status
    }
    if (projectId) {
      projectUpdate({
        variables: {
          updateProjectId: projectId,
          project: variable
        }
      });
    } else {
      projectCreate({
        variables: {
          project: variable
        }
      });
    }
  };

  useEffect(() => {
    if (projectId) {
      getProjectDetail({
        variables: {
          projectId: projectId
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return (
    <ContentFrame>
      <PageTitleComponent title={projectId ? 'Update Project' : 'Create Project'} additionalButton={false} />
      <form onSubmit={handleSubmit(onSubmit)} className='sm:max-w-80'>
        <div className='flex flex-col'>
          <label htmlFor='name'>Title</label>
          <input type="text" {...register("name", { required: "Title is required" })} className={errors.name ? 'border-red-500' : 'border-gray-200'} />
          {errors.name && <span role="alert" className='text-red-700 text-sm'>{errors.name.message}</span>}
        </div>
        <div className='flex flex-col'>
          <label htmlFor='descriptions'>Description</label>
          <textarea {...register("descriptions", { required: "Description is required" })} className={errors.name ? 'border-red-500' : 'border-gray-200'} />
          {errors.descriptions && <span role="alert" className='text-red-700 text-sm'>{errors.descriptions.message}</span>}
        </div>
        <div className='flex flex-col'>
          <Controller
            control={control}
            name="status"
            rules={{ required: true}}
            render={({ field }) => (
              <Select
                label="Status"
                placeholder="Select status"
                data={statusList}
                {...field}
              />
            )}
          />
          {errors.status && <span role="alert" className='text-red-700 text-sm'>Please select a status</span>}
        </div>
        <div className='flex items-center mt-4'>
        <Button type="submit" disabled={createLoader || updateLoader}>Submit</Button>
        <Button type='button' onClick={() => navigate(-1)} variant="transparent" color="rgba(145, 145, 145, 1)">Cancel</Button>
        </div>
    </form>
    </ContentFrame>
  )
}
