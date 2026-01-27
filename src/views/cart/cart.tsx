import { ResponsiveLayout } from '@/components/layout/layout'
import { IProduct } from '@/generated/schema-types'
import { useCartStoreCartItemsIds } from '@/stores/cart-store'
import useSWR from 'swr'

export function CartView() {
	const cartItemsIds = useCartStoreCartItemsIds()
	// const { clearCart } = useCartStoreActions()
	// clearCart()
	const { data: products, isLoading } = useCartProducts(cartItemsIds)
	console.log('products', products)
	const renderCartItems = () => {
		return (
			<div className="grid gap-4">
				{products?.map(product => (
					<div key={product.id} className="p-4 border border-white/20">
						{product.title}
					</div>
				))}
			</div>
		)
	}
	return (
		<ResponsiveLayout leftSection={<div>{renderCartItems()}</div>} rightSection={<div>right</div>}></ResponsiveLayout>
	)
}

export const getProduct = (id: number | string): Promise<IProduct> => {
	return fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
		method: 'GET',
	}).then(res => {
		if (!res.ok) {
			throw new Error(`Failed to fetch product ${id}`)
		}
		return res.json()
	})
}
export function useCartProducts(ids: number[]) {
	const key = ids.length ? ['cart-products', ids.join(',')] : null

	return useSWR<IProduct[]>(
		key,
		async () => {
			const products = await Promise.all(ids.map(id => getProduct(id)))
			return products
		},
		{
			revalidateOnFocus: false,
			dedupingInterval: 60_000,
		},
	)
}
// import type { IGetProductQuery } from '@/generated/schema-types'
// import { useQuery } from '@/hooks/use-query/use-query'
// import useSWR from 'swr'
// import { GET_PRODUCT_QUERY } from './graphql'

// type Product = IGetProductQuery['product']

// export function useCartProducts(ids: number[]) {
// 	const key = ids.length ? ['cart-products', ids.join(',')] : null

// 	return useSWR<Product[]>(key, async () => {
// 		const results = await Promise.all(
// 			ids.map(async id => {
// 				const res = await useQuery<IGetProductQuery>(GET_PRODUCT_QUERY, { variables: { id: String(id) } })
// 				return res.data?.product
// 			}),
// 		)
// 		return results.filter(Boolean) as Product[]
// 	})
// }
