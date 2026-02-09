'use client'

import { ReactNode } from 'react'

import { useToastStoreActions, useToastStoreToasts } from '@/stores/toast-store'

export type ToastType = 'success' | 'error'

const DEFAULT_TIME_TO_LIVE_MS = 5000

export type ToastProps = {
	id?: string
	type?: ToastType
	timeToLiveMs?: number
	hasCloseIcon?: boolean
	content: (onClose: () => void) => ReactNode
}

export function DisplayToasts() {
	const toasts = useToastStoreToasts()
	const { removeToastById } = useToastStoreActions()

	const EXIT_DURATION_MS = 125

	function renderToast(toast: ToastProps) {
		const { id, content, type, timeToLiveMs = DEFAULT_TIME_TO_LIVE_MS, hasCloseIcon = true } = toast

		const shouldAutoDismiss = Boolean(timeToLiveMs && timeToLiveMs > 0)
		return (
			<div
				key={id}
				className={shouldAutoDismiss ? 'toast-exit hover:[animation-play-state:paused]' : undefined}
				style={
					shouldAutoDismiss
						? {
								animationDelay: `${timeToLiveMs}ms`,
								animationDuration: `${EXIT_DURATION_MS}ms`,
							}
						: undefined
				}
				onAnimationEnd={shouldAutoDismiss ? () => removeToastById(toast.id as string) : undefined}
				onClick={
					hasCloseIcon
						? e => {
								e.stopPropagation()
								removeToastById(toast.id as string)
							}
						: undefined
				}
			>
				<div className={`${hasCloseIcon ? 'cursor-pointer' : 'cursor-default'}`}>
					<div
						data-type={type}
						className={`
							mx-auto grid min-w-[20rem] grid-cols-[auto_1fr_auto] items-center rounded-1 border-l-4 glass-neon-pink
							data-[type=success]:border-green-400
							data-[type=error]:border-red
						`}
					>
						<div
							data-type={type}
							className={`
								grid h-full place-items-center px-4
								data-[type=error]:bg-red
								data-[type=success]:bg-green-400
						`}
						></div>
						<div className="p-4">{content(() => removeToastById(toast.id as string))}</div>
						{hasCloseIcon ? <div className="p-4">x</div> : null}
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="fixed bottom-4 max-sm:bottom-3 px-4 max-sm:px-3 grid w-fit gap-4 place-self-center z-650">
			{toasts?.map(renderToast)}
		</div>
	)
}
