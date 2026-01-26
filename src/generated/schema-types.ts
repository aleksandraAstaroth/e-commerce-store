export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

/** category */
export type ICategory = {
  __typename?: 'Category';
  creationAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<IProduct>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ICreateCategoryDto = {
  image: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type ICreateProductDto = {
  categoryId: Scalars['Float']['input'];
  description: Scalars['String']['input'];
  images: Array<Scalars['String']['input']>;
  price: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type ICreateUserDto = {
  avatar: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role?: InputMaybe<IRole>;
};

/** Login  */
export type ILogin = {
  __typename?: 'Login';
  access_token: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
};

export type IMutation = {
  __typename?: 'Mutation';
  addCategory: ICategory;
  addProduct: IProduct;
  addUser: IUser;
  deleteCategory: Scalars['Boolean']['output'];
  deleteProduct: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  login: ILogin;
  refreshToken: ILogin;
  updateCategory: ICategory;
  updateProduct: IProduct;
  updateUser: IUser;
};


export type IMutationAddCategoryArgs = {
  data: ICreateCategoryDto;
};


export type IMutationAddProductArgs = {
  data: ICreateProductDto;
};


export type IMutationAddUserArgs = {
  data: ICreateUserDto;
};


export type IMutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type IMutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type IMutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type IMutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type IMutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type IMutationUpdateCategoryArgs = {
  changes: IUpdateCategoryDto;
  id: Scalars['ID']['input'];
};


export type IMutationUpdateProductArgs = {
  changes: IUpdateProductDto;
  id: Scalars['ID']['input'];
};


export type IMutationUpdateUserArgs = {
  changes: IUpdateUserDto;
  id: Scalars['ID']['input'];
};

/** product  */
export type IProduct = {
  __typename?: 'Product';
  category: ICategory;
  creationAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type IQuery = {
  __typename?: 'Query';
  categories: Array<ICategory>;
  category: ICategory;
  isAvailable: Scalars['Boolean']['output'];
  myProfile: IUser;
  product: IProduct;
  products: Array<IProduct>;
  user: IUser;
  users: Array<IUser>;
};


export type IQueryCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type IQueryIsAvailableArgs = {
  email: Scalars['String']['input'];
};


export type IQueryProductArgs = {
  id: Scalars['ID']['input'];
};


export type IQueryProductsArgs = {
  categoryId?: InputMaybe<Scalars['Float']['input']>;
  categorySlug?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  price_max?: InputMaybe<Scalars['Int']['input']>;
  price_min?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type IQueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type IQueryUsersArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
};

export enum IRole {
  Admin = 'admin',
  Customer = 'customer'
}

export type IUpdateCategoryDto = {
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateProductDto = {
  categoryId?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateUserDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<IRole>;
};

/** product  */
export type IUser = {
  __typename?: 'User';
  avatar: Scalars['String']['output'];
  creationAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type IProductPriceDataFragment = { __typename?: 'Product', price: number };

export type IProductTitleDataFragment = { __typename?: 'Product', title: string };

export type IProductsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type IProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, title: string, price: number }> };

export type IHomeViewProductsDataQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type IHomeViewProductsDataQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, title: string, price: number }> };
