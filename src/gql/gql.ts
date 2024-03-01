/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetCurrentUser {\n    me {\n      id\n      username\n      role {\n        id\n        name\n        description\n        type\n      }\n      email\n      confirmed\n      blocked\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n mutation Login($input: UsersPermissionsLoginInput!) {\n  login(input: $input) {\n    jwt\n    user {\n      id\n      username\n      email\n      confirmed\n      blocked\n    }\n  }\n}\n": types.LoginDocument,
    "\n  query Projects {\n    projects {\n      data {\n        id\n        attributes {\n          name\n          descriptions\n          publishedAt\n        }\n      }\n    }\n  }\n": types.ProjectsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCurrentUser {\n    me {\n      id\n      username\n      role {\n        id\n        name\n        description\n        type\n      }\n      email\n      confirmed\n      blocked\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentUser {\n    me {\n      id\n      username\n      role {\n        id\n        name\n        description\n        type\n      }\n      email\n      confirmed\n      blocked\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n mutation Login($input: UsersPermissionsLoginInput!) {\n  login(input: $input) {\n    jwt\n    user {\n      id\n      username\n      email\n      confirmed\n      blocked\n    }\n  }\n}\n"): (typeof documents)["\n mutation Login($input: UsersPermissionsLoginInput!) {\n  login(input: $input) {\n    jwt\n    user {\n      id\n      username\n      email\n      confirmed\n      blocked\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Projects {\n    projects {\n      data {\n        id\n        attributes {\n          name\n          descriptions\n          publishedAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Projects {\n    projects {\n      data {\n        id\n        attributes {\n          name\n          descriptions\n          publishedAt\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;