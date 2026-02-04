import { ReactNode, useEffect, useRef, useState } from 'react'

type DropdownItem = {
	key?: string
	label: ReactNode
	onClick?: () => void
	href?: string
	disabled?: boolean
	divider?: boolean
	icon?: ReactNode
}

type DropdownProps = {
	trigger: (args: { open: boolean; toggle: () => void }) => ReactNode
	items?: DropdownItem[]
	renderMenu?: (args: { close: () => void }) => ReactNode
	className?: string
	menuClassName?: string
	closeOnItemClick?: boolean
}

export function Dropdown({
	trigger,
	items,
	renderMenu,
	className,
	menuClassName,
	closeOnItemClick = true,
}: DropdownProps) {
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement | null>(null)

	const toggle = () => setOpen(p => !p)
	const close = () => setOpen(false)

	useEffect(() => {
		const checkIfClickedOutside = (e: MouseEvent) => {
			if (!ref.current) return
			if (!ref.current.contains(e.target as Node)) close()
		}
		document.addEventListener('click', checkIfClickedOutside)
		return () => document.removeEventListener('click', checkIfClickedOutside)
	}, [])

	return (
		<div ref={ref} className={className ?? 'relative inline-block'}>
			<div onClick={toggle}>{trigger({ open, toggle })}</div>

			{open && (
				<div
					className={[
						'absolute z-50',
						'mt-2',
						menuClassName ?? 'shadow-neon-pink bg-black p-4 rounded-md shadow-md border border-neon-pink',
					].join(' ')}
					role="menu"
				>
					{renderMenu ? (
						renderMenu({ close })
					) : (
						<ul className="[&>li]:list">
							{items?.map((item, idx) => {
								if (item.divider) {
									return (
										<li key={item.key ?? `divider-${idx}`}>
											<hr className="my-2 border-t" />
										</li>
									)
								}

								const content = (
									<span className="flex items-center">
										{item.icon ? <span className="mr-2">{item.icon}</span> : null}
										{item.label}
									</span>
								)

								const commonProps = {
									className: ['cursor-pointer', item.disabled ? 'opacity-50 pointer-events-none' : ''].join(' '),
									onClick: () => {
										if (item.disabled) return
										item.onClick?.()
										if (closeOnItemClick) close()
									},
								}

								if (item.href) {
									return (
										<li {...commonProps} key={item.key ?? `item-${idx}`}>
											<a className="block" href={item.href}>
												{content}
											</a>
										</li>
									)
								}

								return (
									<li {...commonProps} key={item.key ?? `item-${idx}`}>
										{content}
									</li>
								)
							})}
						</ul>
					)}
				</div>
			)}
		</div>
	)
}
