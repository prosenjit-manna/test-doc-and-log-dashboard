import { graphql } from '../../../../gql';

export const appModuleListQuery = graphql(`
  query AppModules {
    appModules {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`);
