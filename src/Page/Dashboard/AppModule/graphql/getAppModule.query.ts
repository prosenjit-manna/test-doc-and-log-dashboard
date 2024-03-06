import { graphql } from '../../../../gql';

export const getAppModuleMutation = graphql(`
  query AppModule($id: ID) {
    appModule(id: $id) {
      data {
        attributes {
          title
          descriptions
        }
      }
    }
  }
`);
