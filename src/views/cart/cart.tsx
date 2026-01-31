import Icon from '@/components/icon'
import ImageComponent from '@/components/image'
import { QuantityCounter } from '@/components/quantity-counter/quantity-counter'
import { ResponsiveLayout } from '@/components/responsive-layout/responsive-layout'
import { IProduct } from '@/generated/schema-types'
import { useCartStoreActions, useCartStoreCartItems } from '@/stores/cart-store'
import { useEffect } from 'react'
import useSWR from 'swr'

export function CartView() {
	const cartItems = useCartStoreCartItems()
	const { clearCart, removeFromCart, increase, decrease } = useCartStoreActions()

	const getQuantity = (id: number) => cartItems.find(item => item.id === id)?.quantity ?? 0

	const onIncrease = (id: number) => increase(id)
	const onDecrease = (id: number) => decrease(id)

	const { data: products, isLoading } = useCartProducts(cartItems.map(item => item.id))

	useEffect(() => {
		if (cartItems.length > 0 && !isLoading && products === undefined) {
			clearCart()
		}
	}, [cartItems.length, products, isLoading, clearCart])

	const renderCartItems = () => {
		return (
			<ul className="grid gap-2">
				{products?.map(product => {
					return (
						<li title={product.title} className="border flex items-center justify-between p-4 gap-6" key={product.id}>
							<div className="flex items-center gap-6 h-full">
								<div>
									<ImageComponent src={product.images[0]} alt={product.title} width={100} height={100} />
								</div>
								<div className="grid justify-between items-center h-full">
									<h3>{product.title}</h3>
									<p className="font-bold">${product.price}</p>
								</div>
								<QuantityCounter
									quantity={getQuantity(Number(product.id))}
									onIncrease={() => onIncrease(Number(product.id))}
									onDecrease={() => onDecrease(Number(product.id))}
									onRemove={() => removeFromCart(Number(product.id))}
								/>
							</div>
							<div className="grid cursor-pointer p-4" onClick={() => removeFromCart(Number(product.id))}>
								<Icon src="Delete" />
							</div>
						</li>
					)
				})}
			</ul>
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
