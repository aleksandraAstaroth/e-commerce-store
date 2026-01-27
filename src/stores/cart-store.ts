import { append, uniq, without } from 'ramda'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useShallow } from 'zustand/shallow'

type CartStore = {
	cartItemsIds: number[]
	actions: {
		setCartItemsIds: (ids: number[]) => void
		addToCart: (id: number) => void
		removeFromCart: (id: number) => void
		clearCart: () => void
	}
}

const storeDefaults: Omit<CartStore, 'actions'> = {
	cartItemsIds: [],
}

export const useCartStore = create<CartStore>()(
	persist(
		set => ({
			...storeDefaults,
			actions: {
				setCartItemsIds: ids => {
					set({ cartItemsIds: ids })
				},
				addToCart: id => {
					if (!Number.isFinite(id)) return
					set(state => ({
						cartItemsIds: uniq(append(id, state.cartItemsIds)),
					}))
				},

				removeFromCart: id => {
					set(state => ({
						cartItemsIds: without([id], state.cartItemsIds),
					}))
				},

				clearCart: () => set({ cartItemsIds: [] }),
			},
		}),
		{
			name: 'cart-store', // localStorage key
			partialize: state => ({
				cartItemsIds: state.cartItemsIds,
			}),
		},
	),
)

export function useCartStoreActions() {
	return useCartStore(useShallow(state => state.actions))
}

export function useCartStoreCartItemsIds() {
	return useCartStore(state => state.cartItemsIds)
}

export function useCartStoreTotalCount() {
	return useCartStore(state => state.cartItemsIds.length)
}
