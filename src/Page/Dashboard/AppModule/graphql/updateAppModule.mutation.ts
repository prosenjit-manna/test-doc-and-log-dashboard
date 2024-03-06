import { graphql } from '../../../../gql';

export const updateAppModuleMutation = graphql(`
  mutation UpdateAppModule($id: ID!, $data: AppModuleInput!) {
    updateAppModule(id: $id, data: $data) {
      data {
        id
      }
    }
  }
`);
