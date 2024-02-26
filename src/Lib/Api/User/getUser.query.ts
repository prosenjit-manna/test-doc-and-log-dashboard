import { graphql } from '../../../gql';

export const GET_USER_QUERY = graphql(`
  query GetCurrentUser {
    me {
      id
      username
      role {
        id
        name
        description
        type
      }
      email
      confirmed
      blocked
    }
  }
`);
