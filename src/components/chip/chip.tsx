import { ReactNode } from 'react'
import { twJoin } from 'tailwind-merge'

export type ChipProps = {
	children: ReactNode
	onClick?: () => void
}

export function Chip({ children, onClick }: ChipProps) {
	return (
		<div
			onClick={onClick}
			className={twJoin(
				'group select-none grid transition-all ease-in-out grid-flow-col w-fit px-2 py-1  items-center gap-2 rounded-md border-solid border border-gray-600 border-outline',
			)}
		>
			{children}
		</div>
	)
}
