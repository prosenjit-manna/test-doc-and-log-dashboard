import { graphql } from "gql";

export const deleteProject = graphql(`
  mutation DeleteProject($deleteProjectId: ID!) {
    deleteProject(id: $deleteProjectId) {
      data {
        id
      }
    }
  }
`);