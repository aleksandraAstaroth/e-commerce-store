import { getCategoryId } from '@/entities/category/id'
import { getCategoryName } from '@/entities/category/name'
import { ICategoryFilterCategoriesDataQuery } from '@/generated/schema-types'
import { useQuery } from '@/hooks/use-query/use-query'
import { filter, includes, pipe } from 'ramda'
import { twMerge } from 'tailwind-merge'
import { useProductsStoreActions, useProductsStoreSelectedCategoryId } from '../../store'
import { CATEGORY_FILTER_CATEGORIES_DATA_QUERY } from './graphql'

// Only allow these categories to be displayed in the filter due to use of public API
const ALLOWED_CATEGORY_NAMES = ['Clothes', 'Furniture', 'Electronics', 'Shoes', 'Miscellaneous'] as const

export function CategoryFilter() {
	const { data, isLoading } = useQuery<ICategoryFilterCategoriesDataQuery>(CATEGORY_FILTER_CATEGORIES_DATA_QUERY)

	const selectedCategoryId = useProductsStoreSelectedCategoryId()
	const { setSelectedCategoryId } = useProductsStoreActions()

	if (isLoading) return <div className="text-white/70">Loading categories…</div>

	const allowed = ALLOWED_CATEGORY_NAMES as readonly string[]

	type QueryCategory = ICategoryFilterCategoriesDataQuery['categories'][number]

	const categories = pipe(filter((category: QueryCategory) => includes(getCategoryName(category), allowed)))(
		data?.categories ?? [],
	)

	const renderCategory = (category: ICategoryFilterCategoriesDataQuery['categories'][number]) => {
		const id = getCategoryId(category)
		const isSelected = selectedCategoryId === id
		return (
			<li
				key={id}
				className={twMerge('cursor-pointer', isSelected && 'border-l-2 border-purple-400')}
				onClick={() => setSelectedCategoryId(id)}
			>
				<button className="px-3 py-1 cursor-pointer border text-white border-white/20">
					{getCategoryName(category)}
				</button>
			</li>
		)
	}

	return (
		<div className="grid gap-2">
			<ul className="grid">{categories.map(renderCategory)}</ul>
		</div>
	)
}
