'use client'

import { GithubIcon } from '@/assets/icons'
import { Divider } from '@/components/divider/divider'
import Icon from '@/components/icon'
import { UserHeaderActions } from '@/entities/user/components/user-header-actions'
import LogoutButton from '@/entities/user/components/user-header-actions/components/logout-button/logout-button'
import { paths } from '@/helpers/paths/paths'
import useUser from '@/hooks/use-user'
import { useCartStoreTotalQuantity } from '@/stores/cart-store'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Header() {
	const { status } = useUser()

	const [mobileOpen, setMobileOpen] = useState(false)
	const cartItemsTotalCount = useCartStoreTotalQuantity()
	useEffect(() => {
		document.body.style.overflow = mobileOpen ? 'hidden' : ''
		return () => {
			document.body.style.overflow = ''
		}
	}, [mobileOpen])

	function closeMobile() {
		setMobileOpen(false)
	}

	return (
		<header className="z-20 py-2 px-6 shadow-lg sticky top-0 bg-black  border-b border-glow-pink flex items-center justify-between">
			<div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 min-h-10">
				<Link href={paths.root}>
					<h1 className="text-neon-pink md:text-5xl font-semibold text-3xl">NexTShop</h1>
				</Link>
			</div>
			<nav className="hidden lg:flex items-center gap-8 justify-between border-2 py-2 px-6 rounded-xl border-outline">
				<Link href={paths.root} className="text-xl hover:text-neon-turquoise">
					/ Home
				</Link>
				<Link href={paths.products} className="text-xl hover:text-neon-turquoise">
					/ Products
				</Link>
			</nav>
			<div className="flex justify-between items-center gap-4">
				<Link title={'View Cart'} href={paths.cart}>
					<div className="flex gap-1">
						<Icon src="ShoppingCart" />
						<div>{cartItemsTotalCount}</div>
					</div>
				</Link>

				<div className="hidden lg:block">
					<UserHeaderActions />
				</div>

				<div className="flex items-center gap-4">
					<Link title="Go to Github" href="https://github.com/aleksandraAstaroth/e-commerce-store">
						<div className="flex gap-2 items-center">
							<GithubIcon />
						</div>
					</Link>

					<button
						type="button"
						aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
						aria-expanded={mobileOpen}
						onClick={() => setMobileOpen(v => !v)}
						className="lg:hidden px-3 py-2 hover:text-neon-turquoise"
					>
						<span className="text-2xl leading-none">{mobileOpen ? '✕' : '☰'}</span>
					</button>
				</div>
			</div>

			{mobileOpen ? (
				<div className="z-20 border-l-neon-turquoise fixed min-h-full bg-black right-0 top-0 bottom-0 border-2 border-outline rounded-xl p-4">
					<div className="flex justify-end">
						<button
							type="button"
							aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
							aria-expanded={mobileOpen}
							onClick={() => setMobileOpen(v => !v)}
							className="px-3 py-2 hover:text-neon-turquoise"
						>
							<span className="text-2xl leading-none">{mobileOpen ? '✕' : '☰'}</span>
						</button>
					</div>
					<nav className="grid gap-3 p-4">
						<Link href={paths.root} onClick={closeMobile} className="text-xl hover:text-neon-turquoise">
							/ Home
						</Link>
						<Link href={paths.products} onClick={closeMobile} className="text-xl hover:text-neon-turquoise">
							/ Products
						</Link>
						<Divider className="bg-white/40" />

						{status !== 'authenticated' ? <UserHeaderActions /> : <LogoutButton />}

						<Link
							title="Go to Github"
							href="https://github.com/aleksandraAstaroth/e-commerce-store"
							onClick={closeMobile}
							className="hover:text-neon-turquoise"
						></Link>
					</nav>
				</div>
			) : null}
		</header>
	)
}
