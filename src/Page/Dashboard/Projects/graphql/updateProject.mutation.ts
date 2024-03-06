import { graphql } from "gql";

export const updateProject = graphql(`
  mutation UpdateProject($project: ProjectInput!, $updateProjectId: ID!) {
    updateProject(id: $updateProjectId, data: $project) {
      data {
        id
      }
    }
  }
`);