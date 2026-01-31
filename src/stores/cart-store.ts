import { append, evolve, find, inc, map, propEq, reject } from 'ramda'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useShallow } from 'zustand/shallow'
export type CartItem = {
	id: number
	name?: string | null
	price?: number | null
	image?: string | null
	quantity: number
}

type CartStore = {
	cartItems: CartItem[]
	actions: {
		setCartItems: (items: CartItem[]) => void
		addProduct: (item: Omit<CartItem, 'quantity'>) => void
		removeFromCart: (id: number) => void
		increase: (id: number) => void
		decrease: (id: number) => void
		clearCart: () => void
	}
}

const storeDefaults: Omit<CartStore, 'actions'> = {
	cartItems: [],
}

export const useCartStore = create<CartStore>()(
	persist(
		set => ({
			...storeDefaults,
			actions: {
				setCartItems: items => {
					set({ cartItems: items })
				},
				addProduct: (item: Omit<CartItem, 'quantity'>) => {
					if (!Number.isFinite(item.id)) return
					set(state => {
						const exists = find(propEq(item.id, 'id'), state.cartItems)
						if (!exists) {
							return {
								cartItems: append({ ...item, quantity: 1 }, state.cartItems),
							}
						}
						return {
							cartItems: map(p => (p.id === item.id ? evolve({ quantity: inc }, p) : p), state.cartItems),
						}
					})
				},
				removeFromCart: id => {
					set(state => ({
						cartItems: reject(propEq(id, 'id'), state.cartItems),
					}))
				},
				increase: id => {
					set(state => ({
						cartItems: state.cartItems.map(p => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)),
					}))
				},

				decrease: id => {
					set(state => ({
						cartItems: state.cartItems
							.map(p => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
							.filter(p => p.quantity > 0),
					}))
				},

				clearCart: () => set({ cartItems: [] }),
			},
		}),
		{
			name: 'cart-store', // localStorage key
			partialize: state => ({
				cartItems: state.cartItems,
			}),
		},
	),
)

export function useCartStoreActions() {
	return useCartStore(useShallow(state => state.actions))
}

export function useCartStoreCartItems() {
	return useCartStore(state => state.cartItems)
}

export function useCartStoreQuantityById(id: number) {
	return useCartStore(state => state.cartItems.find(item => item.id === id)?.quantity ?? 0)
}

export function useCartStoreTotalQuantity() {
	return useCartStore(state => state.cartItems.reduce((sum, item) => sum + item.quantity, 0))
}

export function useCartStoreTotalCount() {
	return useCartStore(state => state.cartItems.length)
}
