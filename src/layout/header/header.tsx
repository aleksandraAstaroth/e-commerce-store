'use client'

import { useCartStoreTotalCount } from '@/stores/cart-store'

export function Header() {
	const cartItemsTotalCount = useCartStoreTotalCount()
	return (
		<header className="z-20 py-2 px-6 shadow-lg sticky top-0 bg-black  border-b border-glow-pink flex justify-between">
			<div className=" grid grid-cols-[auto_1fr_auto] items-center gap-4 min-h-10">
				<h1 className="text-neon-pink text-5xl font-extrabold">NEXT STORE</h1>
			</div>
			<div>
				<div>Cart</div>
				<div>{cartItemsTotalCount}</div>
			</div>
		</header>
	)
}
