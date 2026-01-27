import { IAddToCartActionButtonDataFragment } from '@/generated/schema-types'
import { useCartStoreActions } from '@/stores/cart-store'

export function AddToCartActionButton({ data }: { data: IAddToCartActionButtonDataFragment }) {
	const { addToCart } = useCartStoreActions()
	const id = Number(data.id)

	const handleClick = () => {
		addToCart(id)
	}

	return (
		<button
			className="py-1 px-2 border rounded-sm cursor-pointer border-glow-pink hover:text-neon-pink"
			onClick={handleClick}
		>
			Add to cart
		</button>
	)
}
