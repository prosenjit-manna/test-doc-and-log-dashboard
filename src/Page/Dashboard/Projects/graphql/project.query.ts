import { graphql } from "gql";

export const projectEntity = graphql(`
  query Project($projectId: ID) {
    project(id: $projectId) {
      data {
        attributes {
          descriptions
          name
          status
        }
      }
    }
  }
`);