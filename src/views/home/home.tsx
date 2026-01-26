import { IHomeViewProductsDataQuery, IHomeViewProductsDataQueryVariables } from '@/generated/schema-types'
import { useQuery } from '@/hooks/use-query/use-query'
import { HOME_VIEW_PRODUCTS_DATA_QUERY } from './graphql'

export function HomeView() {
	const { data, isLoading } = useQuery<IHomeViewProductsDataQuery, IHomeViewProductsDataQueryVariables>(
		HOME_VIEW_PRODUCTS_DATA_QUERY,
		{
			variables: {
				limit: 10,
				offset: 0,
			},
		},
	)
	console.log(data)
	return (
		<div className="p-4 bg-amber-300">
			<>home view</>
			<>{data?.products.map(product => product.title)}</>
		</div>
	)
}
