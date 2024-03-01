import { graphql } from '../../../../gql';

export const createAppModuleMutation = graphql(`
  mutation CreateAppModule($data: AppModuleInput!) {
    createAppModule(data: $data) {
      data {
        id
      }
    }
  }
`);
