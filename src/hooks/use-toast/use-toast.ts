'use client'

import type { ReactNode } from 'react'

import { useToastStoreActions } from '@/stores/toast-store'
export type ToastType = 'success' | 'information' | 'warning' | 'error'

export type ToastProps = {
	id?: string
	type?: ToastType
	timeToLiveMs?: number
	hasCloseIcon?: boolean
	content: (onClose: () => void) => ReactNode
}

type ToastInput = Omit<ToastProps, 'id' | 'content'> & {
	id?: string
	content: ReactNode | ((onClose: () => void) => ReactNode)
}

export function useToast() {
	const { addToast, removeToastById } = useToastStoreActions()

	function toast(input: ToastInput) {
		const normalized: ToastProps = {
			...input,
			content: onClose => (typeof input.content === 'function' ? input.content(onClose) : input.content),
		}

		return addToast(normalized)
	}

	function dismissById(id: string) {
		removeToastById(id)
	}

	const make = (type: ToastType) => (content: ToastInput['content'], opts?: Omit<ToastInput, 'content' | 'type'>) =>
		toast({ type, content, ...opts })

	return {
		toast,
		dismissById,
		success: make('success'),
		error: make('error'),
	}
}
