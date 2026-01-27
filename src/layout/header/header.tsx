'use client'

import Icon from '@/components/icon'
import { useCartStoreTotalCount } from '@/stores/cart-store'
import Link from 'next/link'

export function Header() {
	const cartItemsTotalCount = useCartStoreTotalCount()
	return (
		<header className="z-20 py-2 px-6 shadow-lg sticky top-0 bg-black  border-b border-glow-pink flex items-center justify-between">
			<div className=" grid grid-cols-[auto_1fr_auto] items-center gap-4 min-h-10">
				<Link href="/products">
					<h1 className="text-neon-pink text-5xl font-extrabold">NEXT STORE</h1>
				</Link>
			</div>
			<Link href="/cart">
				<div className="flex gap-1">
					<Icon src="ShoppingCart" />
					<div>{cartItemsTotalCount}</div>
				</div>
			</Link>
			<Link href="/cart">
				<div className="flex gap-2 items-center">
					<Icon src="GithubIcon" className="w-[1.125rem] h-[1.125rem]" />
				</div>
			</Link>
		</header>
	)
}
