import { twMerge } from 'tailwind-merge'

export function Divider({
	vertical,
	surface,
	className,
}: {
	vertical?: boolean
	surface?: boolean
	className?: string
}) {
	return (
		<div
			className={twMerge(surface ? 'bg-surface' : 'bg-outline', vertical ? 'w-px h-full max-h-8' : 'h-px', className)}
		/>
	)
}
