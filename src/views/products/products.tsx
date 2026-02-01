import { LoadingSpinner } from '@/components/loading/loading'
import { ResponsiveLayout } from '@/components/responsive-layout/responsive-layout'
import { ProductCard } from '@/entities/product/components/card/card'
import { getProductId } from '@/entities/product/id'
import { IProductsViewProductsDataQuery, IProductsViewProductsDataQueryVariables } from '@/generated/schema-types'
import { useQuery } from '@/hooks/use-query/use-query'
import { CategoryFilter } from './components/category-filter/category-filter'
import { PRODUCTS_VIEW_PRODUCTS_DATA_QUERY } from './graphql'
import { useProductsStoreSelectedCategoryId } from './store'

export function ProductsView() {
	const selectedCategoryId = useProductsStoreSelectedCategoryId()

	const { data, isLoading } = useQuery<IProductsViewProductsDataQuery, IProductsViewProductsDataQueryVariables>(
		PRODUCTS_VIEW_PRODUCTS_DATA_QUERY,
		{
			variables: {
				limit: 100,
				categoryId: selectedCategoryId,
				offset: 0,
			},
		},
	)

	const renderProductCard = (card: IProductsViewProductsDataQuery['products'][number]) => {
		return <ProductCard key={getProductId(card)} data={card} />
	}
	if (isLoading) {
		return (
			<div className="grid place-items-center py-10">
				<LoadingSpinner size="lg" />
			</div>
		)
	}
	return (
		<ResponsiveLayout
			headerSection={
				<div>
					<h1 className="text-3xl font-bold">Products</h1>
				</div>
			}
			rightSection={<CategoryFilter />}
			leftSection={<div className="grid grid-cols-3 gap-4">{data?.products.map(renderProductCard)}</div>}
		/>
	)
}
