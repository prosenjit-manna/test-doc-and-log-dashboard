import { graphql } from '../../../../gql';

export const appModuleListQuery = graphql(`
  query AppModules($pagination: PaginationArg) {
  appModules(pagination: $pagination) {
    data {
      id
      attributes {
        title
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}
`);
