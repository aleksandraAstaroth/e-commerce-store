import { IGetProductQuery, IGetProductQueryVariables } from '@/generated/schema-types'
import { useQuery } from '@/hooks/use-query/use-query'
import { GET_PRODUCT_QUERY } from '../../graphql'

export function CartProductLoader({ productId }: { productId: string }) {
	const { data, isLoading } = useQuery<IGetProductQuery, IGetProductQueryVariables>(GET_PRODUCT_QUERY, {
		variables: { id: productId },
		swrOptions: {
			dedupingInterval: 60_000,
			revalidateOnFocus: false,
		},
	})

	if (isLoading) return <div>Loading…</div>
	if (!data?.product) return null

	return <div>{data?.product?.title}</div>
}
