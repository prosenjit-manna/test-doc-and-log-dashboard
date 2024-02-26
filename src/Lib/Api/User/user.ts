import { apolloClient } from "Lib/ApolloClient";
import { GET_USER_QUERY } from "./getUser.query";

export const userApi = {
  currentUser: async () => {
    return await apolloClient.query({ query: GET_USER_QUERY })
  },
};
