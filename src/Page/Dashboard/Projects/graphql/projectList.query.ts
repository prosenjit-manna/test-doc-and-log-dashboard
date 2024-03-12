import { graphql } from "gql";

export const ProjectList = graphql(`
  query Projects($pagination: PaginationArg, $filters: ProjectFiltersInput) {
    projects(pagination: $pagination, filters: $filters) {
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