import { useMutation } from '@apollo/client';
import { Button } from '@mantine/core';
import { ProjectInput } from 'gql/graphql';
import React from 'react'
import { useForm } from 'react-hook-form';
import { createProject } from '../graphql/createProject.mutation';
import { useNavigate, useParams } from 'react-router-dom';
import { projectRoutes } from 'Lib/Routes/ProjectRoutes';
import { updateProject } from '../graphql/updateProject.mutation';
import PageTitleComponent from 'Components/PageTitle/PageTitleComponent';

export default function ProjectForm() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectInput>();

  const [projectCreate, {loading: createLoader }] = useMutation(createProject, {
    onCompleted: (d) => {
      if (d.createProject?.data?.id) {
        navigate(projectRoutes.update.fullPath({ projectId: String(d.createProject.data.id) }));
      }
    }
  }); 

  const [projectUpdate, { loading: updateLoader }] = useMutation(updateProject, {
    onCompleted: (d) => {
      
      if (d.updateProject?.data?.id) {
        navigate(projectRoutes.update.fullPath({ projectId: String(d.updateProject.data.id) }));
      }
    }
  });

  const onSubmit = (data: ProjectInput) => {
    try {
      const variable: ProjectInput = {
        name: data.name,
        descriptions: data.descriptions,
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
    } catch(e) {
      console.log(e);
    }
    
  };

  return (
    <div className='p-5'>
      <PageTitleComponent title='Create Project' additionalButton={false} />
      <form onSubmit={handleSubmit(onSubmit)} className='sm:max-w-80'>
        <div className='flex flex-col'>
          <label htmlFor='name'>Project Name</label>
          <input type="text" {...register("name", { required: "Project name is required" })} className={errors.name ? 'border-red-500' : 'border-gray-200'} />
          {errors.name && <span role="alert" className='text-red-700 text-sm'>{errors.name.message}</span>}
        </div>
        <div className='flex flex-col'>
          <label htmlFor='descriptions'>Project Description</label>
          <textarea {...register("descriptions", { required: "Project description is required" })} className={errors.name ? 'border-red-500' : 'border-gray-200'} />
          {errors.descriptions && <span role="alert" className='text-red-700 text-sm'>{errors.descriptions.message}</span>}
        </div>
        <div className='flex items-center mt-4'>
        <Button type="submit" disabled={createLoader || updateLoader}>Submit</Button>
        <Button type='button' onClick={() => navigate(-1)} variant="transparent" color="rgba(145, 145, 145, 1)">Cancel</Button>
        </div>
    </form>
    </div>
  )
}
