import { EmptyShoppingCart } from '@/assets/icons/empty-shopping-cart'
import Card from '@/components/card/card'
import Icon from '@/components/icon'
import ImageComponent from '@/components/image'
import { QuantityCounter } from '@/components/quantity-counter/quantity-counter'
import { ResponsiveLayout } from '@/components/responsive-layout/responsive-layout'
import { getProductId } from '@/entities/product/id'
import { getProductPrice } from '@/entities/product/price'
import { getProductTitle } from '@/entities/product/title'
import { IProduct } from '@/generated/schema-types'
import { paths } from '@/helpers/paths/paths'
import { useCartStoreActions, useCartStoreCartItems, useCartStoreTotalQuantity } from '@/stores/cart-store'
import Link from 'next/link'
import { indexBy, prop, reduce } from 'ramda'
import { useEffect } from 'react'
import useSWR from 'swr'

export function CartView() {
	const cartItems = useCartStoreCartItems()
	const cartItemsTotalCount = useCartStoreTotalQuantity()

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

	const quantityById = indexBy(prop('id'), cartItems)

	const getTotalPrice = reduce(
		(sum, product) => sum + (Number(getProductPrice(product)) || 0) * (quantityById[Number(product.id)]?.quantity ?? 0),
		0,
		products ?? [],
	)

	const renderCartItems = () => {
		return (
			<ul className="grid gap-2">
				{products?.map(product => {
					return (
						<li
							title={getProductTitle(product)}
							className="border-white/30 border flex items-center justify-between p-4 gap-6"
							key={getProductId(product)}
						>
							<div className="flex items-center gap-6 h-full">
								<div>
									<ImageComponent
										src={product.images[0]}
										alt={getProductTitle(product) ?? ''}
										width={100}
										height={100}
									/>
								</div>
								<div className="grid justify-between items-center h-full">
									<h3>{getProductTitle(product)}</h3>
									<p className="font-bold">${getProductPrice(product)}</p>
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

	const renderEmptyState = () => {
		return (
			<div className="grid justify-center items-center rounded-lg gap-4 p-20">
				<div className="grid h-full items-center borders justify-center text-neon-pink">
					<EmptyShoppingCart className="w-56! h-56! drop-shadow-xl drop-shadow-neon-turquoise" />
				</div>
				<h3 className="text-2xl  text-neon-turquoise">{'Your cart is empty :('}</h3>
				<Link
					href={paths.products}
					className="w-full text-center border border-neon-turquoise hover:text-neon-turquoise hover-border-glow-turquoise  text-white py-3 rounded-lg "
				>
					View Products
				</Link>
			</div>
		)
	}

	if (cartItems.length === 0) {
		return renderEmptyState()
	}

	return (
		<ResponsiveLayout
			leftSection={<div className="w-full">{renderCartItems()}</div>}
			rightSection={
				<Card className="w-full p-6 glass-neon-pink">
					<h2 className="text-xl text-white font-bold mb-4">Order Summary</h2>
					<div className="flex justify-between mb-2">
						<span>Items ({cartItemsTotalCount})</span>
						<div>
							Total: <span className="font-bold">${getTotalPrice}</span>
						</div>
					</div>
					<button className="w-full mt-6 text-center bg-neon-pink uppercase text-black font-bold py-3 px-6 rounded">
						Checkout
					</button>
				</Card>
			}
		></ResponsiveLayout>
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
