import { ToastProps } from '@/components/toast/toast'
import { v4 } from 'uuid'
import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

export type ToastId = string

export type ToastStoreProps = {
	toasts: ReadonlyArray<ToastProps>
	actions: {
		addToast: (toast: Omit<ToastProps, 'id'> & { id?: ToastId }) => ToastId
		removeToastById: (id: ToastId) => void
		clearToasts: () => void
	}
}

export const toastStore = create<ToastStoreProps>()((set, get) => ({
	toasts: [],
	actions: {
		addToast(toast) {
			const id = toast.id ?? v4()

			if (get().toasts.some(t => t.id === id)) return id

			set(state => ({
				toasts: [...state.toasts, { ...toast, id } as ToastProps],
			}))

			return id
		},
		removeToastById(id) {
			set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }))
		},
		clearToasts() {
			set({ toasts: [] })
		},
	},
}))

export function useToastStoreToasts() {
	return toastStore(useShallow(s => s.toasts))
}

export function useToastStoreActions() {
	return toastStore(useShallow(s => s.actions))
}
