import { graphql } from '../../../../gql';

export const deleteAppModuleMutation = graphql(`
  mutation DeleteAppModule($id: ID!) {
    deleteAppModule(id: $id) {
      data {
        id
      }
    }
  }
`);
