import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Card({
	children,
	className,
	...rest
}: { children: ReactNode } & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
	return (
		<div
			className={twMerge('bg-black border-2 border-neon-glow-turquoise rounded overflow-clip )]', className)}
			{...rest}
		>
			{children}
		</div>
	)
}
