import { graphql } from "gql";

export const ProjectList = graphql(`
  query Projects($pagination: PaginationArg) {
    projects(pagination: $pagination) {
      data {
        id
        attributes {
          name
          descriptions
          status
        }
      }
      meta {
        pagination {
          total
          pageSize
          pageCount
          page
        }
      }
    }
  }
`);