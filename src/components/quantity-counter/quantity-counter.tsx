import Icon from '@/components/icon'
import { twMerge } from 'tailwind-merge'

type QuantityCounterProps = {
	quantity: number
	onIncrease: () => void
	onDecrease: () => void
	onRemove: () => void
	className?: string
}

export function QuantityCounter({ quantity, onIncrease, onDecrease, onRemove, className }: QuantityCounterProps) {
	return (
		<div className={twMerge('flex items-center gap-2', className)}>
			<button className="h-8 w-8 button" onClick={onIncrease} type="button">
				+
			</button>

			<span className="inline-block text-center border border-white min-w-10 py-1 px-2 text-md rounded-lg">
				{quantity}
			</span>

			{quantity > 1 ? (
				<button className="h-8 w-8 button" onClick={onDecrease} type="button">
					-
				</button>
			) : (
				<button className="h-8 w-8 button" onClick={onRemove} type="button">
					<Icon src="Delete" className="w-4! h-4! hover:fill-red!" />
				</button>
			)}
		</div>
	)
}
