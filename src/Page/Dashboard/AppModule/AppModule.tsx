import { Box, Button, Group, Input, TextInput, Title } from '@mantine/core';
import { AppModuleRoute, appModuleRoutes } from 'Lib/Routes/AppModuleRoutes';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '@mantine/form';
import MDEditor from '@uiw/react-md-editor';
import { useLazyQuery, useMutation } from '@apollo/client';
import { createAppModuleMutation } from './graphql/createAppModule.mutation';
import { updateAppModuleMutation } from './graphql/updateAppModule.mutation';
import { notifications } from '@mantine/notifications';
import { getAppModuleMutation } from './graphql/getAppModule.query';

export default function AppModule() {
  const navigate = useNavigate()
  const params: AppModuleRoute = useParams() as any;
  const form = useForm({
    initialValues: {
      title: '',
      descriptions: "**Hello world!!!**",
    },
  });
  const [createModule, { loading: creating }] = useMutation(createAppModuleMutation)
  const [updateModule, { loading: editing }] = useMutation(updateAppModuleMutation)
  const [getAppModule] = useLazyQuery(getAppModuleMutation);
  

  function submitForm(values: any) {
    if (params?.moduleId) {
      updateModule({
        variables: {
          id: params.moduleId,
          data: {
            title: values.title,
            descriptions: values.descriptions
          }
        },
        onCompleted: (d) => {
          notifications.show({ message: 'Updated Successfully' })
        }
      })
    } else {
      createModule({ 
        variables: {
          data: {
            title: values.title,
            descriptions: values.descriptions
          }
        },
        onCompleted: (d) => {
          notifications.show({ message: 'New Module added' })
          navigate(appModuleRoutes.module.fullPath({ moduleId: d.createAppModule?.data?.id as string }))
        }
      })
    }
    
  }

  useEffect(() => {
    if (params.moduleId) {
      getAppModule({
        variables: {
          id: params.moduleId
        },
        onCompleted: (d) => {
          form.setValues({
            title: d.appModule?.data?.attributes?.title || '',
            descriptions: d.appModule?.data?.attributes?.descriptions || ''
          })
        }
      })
    }
  }, [params?.moduleId])

  return (
    <div className='p-4'>
      <Title order={1}>Module {params?.moduleId ? 'Edit' : 'Add'}</Title>
      <Box>
        <form onSubmit={form.onSubmit((values) => submitForm(values))}>
          <TextInput
            withAsterisk
            label='Title'
            {...form.getInputProps('title')}
          />

          <div className='container w-full mt-4'>
            <Input.Label required>Descriptions</Input.Label>
            <MDEditor
              data-color-mode="light"
              value={form.getInputProps('descriptions').value}
              onChange={v => form.setFieldValue('descriptions', v || '')}
            />
          </div>

          <Group mt='md'>
            <Button type='submit' disabled={(creating || editing)} loading={(creating || editing)}>Submit</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
}
