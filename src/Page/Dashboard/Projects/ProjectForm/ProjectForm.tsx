import { useMutation } from '@apollo/client';
import { Button, Checkbox } from '@mantine/core';
import { ProjectInput } from 'gql/graphql';
import React from 'react'
import { useForm } from 'react-hook-form';
import { createProject } from '../graphql/createProject.mutation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { projectRoutes } from 'Lib/Routes/ProjectRoutes';

export default function ProjectForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectInput>();

  const [projectCreate, {loading: createLoader }] = useMutation(createProject, {
    onCompleted: (d) => {
      if (d.createProject?.data?.id) {
        toast.success('Project is created');
        navigate(projectRoutes.update.fullPath({ projectId: String(d.createProject.data.id) }));
      }
    },
    onError: (e) => toast.error('Have some error') 
  }); 

  const onSubmit = (data: ProjectInput) => {
    try {
      const variable: ProjectInput = {
        name: data.name,
        descriptions: data.descriptions,
        publishedAt: data.publishedAt ? null : new Date().toISOString()
      }
      projectCreate({
        variables: {
          project: variable
        }
      });
    } catch(e) {
      console.log(e);
    }
    
  };

  return (
    <div className='p-5'>
      <h1 className='flex-1'>Create Projects</h1>
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
        <Checkbox
          mt="md"
          label="Save as Draft"
          {...register('publishedAt')}
        />
        <Button type="submit" className='mt-4' disabled={createLoader}>Submit</Button>
    </form>
    </div>
  )
}
