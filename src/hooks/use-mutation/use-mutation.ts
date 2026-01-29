'use client'
import { DocumentNode } from 'graphql'
import request, { Variables } from 'graphql-request'
import { getGqlPath } from '../use-query/use-query'

export function useMutation<TMutation, TMutationVariables extends Variables>(document: DocumentNode) {
	async function mutate(variables: TMutationVariables) {
		return request<TMutation>(getGqlPath(), document, variables)
	}

	return [mutate]
}
