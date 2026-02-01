import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Card({
	children,
	className,
	...rest
}: { children: ReactNode } & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
	return (
		<div className={twMerge('border-2 border-white/20  rounded overflow-clip )]', className)} {...rest}>
			{children}
		</div>
	)
}
