'use client'

import { GithubIcon } from '@/assets/icons'
import { Dropdown } from '@/components/dropdown/dropdown'
import Icon from '@/components/icon'
import { paths } from '@/helpers/paths/paths'
import useUser from '@/hooks/use-user'
import { useCartStoreTotalQuantity } from '@/stores/cart-store'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export function Header() {
	const { status } = useUser()

	const cartItemsTotalCount = useCartStoreTotalQuantity()

	async function handleSignOut() {
		await signOut({
			callbackUrl: paths.login,
		})
		window.location.href = paths.login
	}

	return (
		<header className="z-20 py-2 px-6 shadow-lg sticky top-0 bg-black  border-b border-glow-pink flex items-center justify-between">
			<div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 min-h-10">
				<Link href={paths.products}>
					<h1 className="text-neon-pink text-5xl font-semibold">NexTShop</h1>
				</Link>
			</div>
			<div className="flex justify-between items-center gap-6">
				<Dropdown
					trigger={({ open }) => (
						<button className="px-3 py-2 rounded bg-black text-white">Actions {open ? '▲' : '▼'}</button>
					)}
					renderMenu={() => <div>hi</div>}
				></Dropdown>
				<Link title={'View Cart'} href={paths.cart}>
					<div className="flex gap-1">
						{status === 'authenticated' && <div>authenticated</div>}
						<Icon src="ShoppingCart" />
						<div>{cartItemsTotalCount}</div>
					</div>
				</Link>
				<Link title="Go to Github" href="https://github.com/aleksandraAstaroth/e-commerce-store">
					<div className="flex gap-2 items-center">
						<GithubIcon />
					</div>
				</Link>
				<button onClick={handleSignOut}>Sign Out</button>
			</div>
		</header>
	)
}
