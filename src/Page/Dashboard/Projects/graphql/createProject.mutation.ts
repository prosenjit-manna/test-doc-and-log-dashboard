import { graphql } from "gql";

export const createProject = graphql(`
  mutation CreateProject($project: ProjectInput!) {
    createProject(data: $project) {
      data {
        id
      }
    }
  }
`);