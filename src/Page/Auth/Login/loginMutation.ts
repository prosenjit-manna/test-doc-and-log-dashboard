import { graphql } from '../../../gql'

export const LOGIN_MUTATION = graphql(`
 mutation Login($input: UsersPermissionsLoginInput!) {
  login(input: $input) {
    jwt
    user {
      id
      username
      email
      confirmed
      blocked
    }
  }
}
`);