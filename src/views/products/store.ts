import { create } from 'zustand'
import { useShallow } from 'zustand/shallow'

type ProductStore = {
	selectedCategoryId: number | null
	actions: {
		setSelectedCategoryId: (id: number | null) => void
	}
}

const storeDefaults: Omit<ProductStore, 'actions'> = {
	selectedCategoryId: null,
}

export const useProductsStore = create<ProductStore>()(set => ({
	...storeDefaults,
	actions: {
		setSelectedCategoryId: id => set({ selectedCategoryId: id }),
	},
}))

export function useProductsStoreActions() {
	return useProductsStore(useShallow(state => state.actions))
}
export function useProductsStoreSelectedCategoryId() {
	return useProductsStore(state => state.selectedCategoryId)
}
