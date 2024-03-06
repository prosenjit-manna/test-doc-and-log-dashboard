import { graphql } from "gql";

export const ProjectList = graphql(`
  query Projects {
    projects {
      data {
        id
        attributes {
          name
          descriptions
          status
        }
      }
    }
  }
`);