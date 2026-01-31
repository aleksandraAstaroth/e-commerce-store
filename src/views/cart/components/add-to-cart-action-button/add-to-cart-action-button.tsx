import { QuantityCounter } from '@/components/quantity-counter/quantity-counter'
import {
	IAddToCartActionButtonDataFragment,
	IGetProductQuery,
	IGetProductQueryVariables,
} from '@/generated/schema-types'
import { useQuery } from '@/hooks/use-query/use-query'
import { useCartStoreActions, useCartStoreQuantityById } from '@/stores/cart-store'
import { GET_PRODUCT_QUERY } from '../../graphql'

export function AddToCartActionButton({ data }: { data: IAddToCartActionButtonDataFragment }) {
	const { addProduct, increase, decrease, removeFromCart } = useCartStoreActions()

	const { data: productData, isLoading } = useQuery<IGetProductQuery, IGetProductQueryVariables>(GET_PRODUCT_QUERY, {
		variables: { id: data.id },
	})

	const id = Number(data.id)

	const handleClick = () => {
		addProduct({ id, name: productData?.product.title, price: productData?.product.price })
	}
	const onIncrease = () => increase(id)
	const onDecrease = () => decrease(id)
	const onRemove = () => removeFromCart(id)

	const qty = useCartStoreQuantityById(id)

	if (qty <= 0) {
		return (
			<button className="py-1 px-2 border rounded-sm border-glow-pink hover:text-neon-pink" onClick={handleClick}>
				Add to cart
			</button>
		)
	}
	if (qty > 0) {
		return <QuantityCounter quantity={qty} onIncrease={onIncrease} onDecrease={onDecrease} onRemove={onRemove} />
	}
}
