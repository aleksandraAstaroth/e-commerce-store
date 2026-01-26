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
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "fragment productPriceData on Product {\n  price\n}": typeof types.ProductPriceDataFragmentDoc,
    "fragment productTitleData on Product {\n  title\n}": typeof types.ProductTitleDataFragmentDoc,
    "query Products($limit: Int!, $offset: Int!) {\n  products(limit: $limit, offset: $offset) {\n    id\n    title\n    price\n  }\n}": typeof types.ProductsDocument,
    "query homeViewProductsData($limit: Int!, $offset: Int!) {\n  products(limit: $limit, offset: $offset) {\n    id\n    title\n    price\n  }\n}": typeof types.HomeViewProductsDataDocument,
};
const documents: Documents = {
    "fragment productPriceData on Product {\n  price\n}": types.ProductPriceDataFragmentDoc,
    "fragment productTitleData on Product {\n  title\n}": types.ProductTitleDataFragmentDoc,
    "query Products($limit: Int!, $offset: Int!) {\n  products(limit: $limit, offset: $offset) {\n    id\n    title\n    price\n  }\n}": types.ProductsDocument,
    "query homeViewProductsData($limit: Int!, $offset: Int!) {\n  products(limit: $limit, offset: $offset) {\n    id\n    title\n    price\n  }\n}": types.HomeViewProductsDataDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment productPriceData on Product {\n  price\n}"): (typeof documents)["fragment productPriceData on Product {\n  price\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment productTitleData on Product {\n  title\n}"): (typeof documents)["fragment productTitleData on Product {\n  title\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query Products($limit: Int!, $offset: Int!) {\n  products(limit: $limit, offset: $offset) {\n    id\n    title\n    price\n  }\n}"): (typeof documents)["query Products($limit: Int!, $offset: Int!) {\n  products(limit: $limit, offset: $offset) {\n    id\n    title\n    price\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query homeViewProductsData($limit: Int!, $offset: Int!) {\n  products(limit: $limit, offset: $offset) {\n    id\n    title\n    price\n  }\n}"): (typeof documents)["query homeViewProductsData($limit: Int!, $offset: Int!) {\n  products(limit: $limit, offset: $offset) {\n    id\n    title\n    price\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;