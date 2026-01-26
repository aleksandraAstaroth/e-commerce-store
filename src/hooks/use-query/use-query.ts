'use client'

import { DocumentNode } from 'graphql'
import { GraphQLClient, Variables } from 'graphql-request'
import useSWR from 'swr'
import { BareFetcher, PublicConfiguration } from 'swr/_internal'

export function getGqlPath() {
	return 'https://api.escuelajs.co/graphql'
}

export function useQuery<TQuery, TQueryVariables extends Variables = Variables>(
	document: DocumentNode,
	options?: {
		variables?: TQueryVariables
		swrOptions?: Partial<PublicConfiguration<TQuery, TQueryVariables, BareFetcher<TQuery>>> | undefined
		skip?: boolean
		customKey?: string
	},
) {
	const client = new GraphQLClient('https://api.escuelajs.co/graphql')

	const key = options?.customKey
		? [options?.customKey, options?.skip]
		: options?.variables != null
		? [document, JSON.stringify(options?.variables), options?.skip]
		: [document, options?.skip]
	const swr = useSWR<TQuery, TQueryVariables>(
		key,
		options?.skip ? null : async () => client.request<TQuery>(document, options?.variables),
		{
			...{
				revalidateOnFocus: false,
			},
			...(options?.swrOptions ?? {}),
		},
	)

	return { ...swr, key }
}
