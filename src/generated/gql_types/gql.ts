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
    "fragment categoryIdData on Category {\n  id\n}": typeof types.CategoryIdDataFragmentDoc,
    "fragment categoryImageData on Category {\n  image\n}": typeof types.CategoryImageDataFragmentDoc,
    "fragment categoryNameData on Category {\n  name\n}": typeof types.CategoryNameDataFragmentDoc,
    "fragment productCardData on Product {\n  ...productTitleData\n  ...productDescriptionData\n  ...productPriceData\n  ...productIdData\n  images\n  category {\n    ...categoryIdData\n    ...categoryNameData\n  }\n  ...addToCartActionButtonData\n}": typeof types.ProductCardDataFragmentDoc,
    "fragment productDescriptionData on Product {\n  description\n}": typeof types.ProductDescriptionDataFragmentDoc,
    "fragment productIdData on Product {\n  id\n}": typeof types.ProductIdDataFragmentDoc,
    "fragment productPriceData on Product {\n  price\n}": typeof types.ProductPriceDataFragmentDoc,
    "fragment productTitleData on Product {\n  title\n}": typeof types.ProductTitleDataFragmentDoc,
    "fragment addToCartActionButtonData on Product {\n  ...productIdData\n}": typeof types.AddToCartActionButtonDataFragmentDoc,
    "query getProduct($id: ID!) {\n  product(id: $id) {\n    id\n    title\n    price\n    images\n  }\n}": typeof types.GetProductDocument,
    "query categoryFilterCategoriesData {\n  categories {\n    id\n    name\n    image\n  }\n}": typeof types.CategoryFilterCategoriesDataDocument,
    "query productsViewProductsData($limit: Int!, $offset: Int!, $categoryId: Float) {\n  products(limit: $limit, offset: $offset, categoryId: $categoryId) {\n    ...productCardData\n    category {\n      ...categoryIdData\n      ...categoryNameData\n    }\n  }\n}": typeof types.ProductsViewProductsDataDocument,
};
const documents: Documents = {
    "fragment categoryIdData on Category {\n  id\n}": types.CategoryIdDataFragmentDoc,
    "fragment categoryImageData on Category {\n  image\n}": types.CategoryImageDataFragmentDoc,
    "fragment categoryNameData on Category {\n  name\n}": types.CategoryNameDataFragmentDoc,
    "fragment productCardData on Product {\n  ...productTitleData\n  ...productDescriptionData\n  ...productPriceData\n  ...productIdData\n  images\n  category {\n    ...categoryIdData\n    ...categoryNameData\n  }\n  ...addToCartActionButtonData\n}": types.ProductCardDataFragmentDoc,
    "fragment productDescriptionData on Product {\n  description\n}": types.ProductDescriptionDataFragmentDoc,
    "fragment productIdData on Product {\n  id\n}": types.ProductIdDataFragmentDoc,
    "fragment productPriceData on Product {\n  price\n}": types.ProductPriceDataFragmentDoc,
    "fragment productTitleData on Product {\n  title\n}": types.ProductTitleDataFragmentDoc,
    "fragment addToCartActionButtonData on Product {\n  ...productIdData\n}": types.AddToCartActionButtonDataFragmentDoc,
    "query getProduct($id: ID!) {\n  product(id: $id) {\n    id\n    title\n    price\n    images\n  }\n}": types.GetProductDocument,
    "query categoryFilterCategoriesData {\n  categories {\n    id\n    name\n    image\n  }\n}": types.CategoryFilterCategoriesDataDocument,
    "query productsViewProductsData($limit: Int!, $offset: Int!, $categoryId: Float) {\n  products(limit: $limit, offset: $offset, categoryId: $categoryId) {\n    ...productCardData\n    category {\n      ...categoryIdData\n      ...categoryNameData\n    }\n  }\n}": types.ProductsViewProductsDataDocument,
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
export function gql(source: "fragment categoryIdData on Category {\n  id\n}"): (typeof documents)["fragment categoryIdData on Category {\n  id\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment categoryImageData on Category {\n  image\n}"): (typeof documents)["fragment categoryImageData on Category {\n  image\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment categoryNameData on Category {\n  name\n}"): (typeof documents)["fragment categoryNameData on Category {\n  name\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment productCardData on Product {\n  ...productTitleData\n  ...productDescriptionData\n  ...productPriceData\n  ...productIdData\n  images\n  category {\n    ...categoryIdData\n    ...categoryNameData\n  }\n  ...addToCartActionButtonData\n}"): (typeof documents)["fragment productCardData on Product {\n  ...productTitleData\n  ...productDescriptionData\n  ...productPriceData\n  ...productIdData\n  images\n  category {\n    ...categoryIdData\n    ...categoryNameData\n  }\n  ...addToCartActionButtonData\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment productDescriptionData on Product {\n  description\n}"): (typeof documents)["fragment productDescriptionData on Product {\n  description\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment productIdData on Product {\n  id\n}"): (typeof documents)["fragment productIdData on Product {\n  id\n}"];
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
export function gql(source: "fragment addToCartActionButtonData on Product {\n  ...productIdData\n}"): (typeof documents)["fragment addToCartActionButtonData on Product {\n  ...productIdData\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getProduct($id: ID!) {\n  product(id: $id) {\n    id\n    title\n    price\n    images\n  }\n}"): (typeof documents)["query getProduct($id: ID!) {\n  product(id: $id) {\n    id\n    title\n    price\n    images\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query categoryFilterCategoriesData {\n  categories {\n    id\n    name\n    image\n  }\n}"): (typeof documents)["query categoryFilterCategoriesData {\n  categories {\n    id\n    name\n    image\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query productsViewProductsData($limit: Int!, $offset: Int!, $categoryId: Float) {\n  products(limit: $limit, offset: $offset, categoryId: $categoryId) {\n    ...productCardData\n    category {\n      ...categoryIdData\n      ...categoryNameData\n    }\n  }\n}"): (typeof documents)["query productsViewProductsData($limit: Int!, $offset: Int!, $categoryId: Float) {\n  products(limit: $limit, offset: $offset, categoryId: $categoryId) {\n    ...productCardData\n    category {\n      ...categoryIdData\n      ...categoryNameData\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;