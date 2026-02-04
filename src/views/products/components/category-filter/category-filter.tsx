import { LoadingSpinner } from '@/components/loading/loading'
import { getCategoryId } from '@/entities/category/id'
import { getCategoryName } from '@/entities/category/name'
import { ICategoryFilterCategoriesDataQuery } from '@/generated/schema-types'
import { useQuery } from '@/hooks/use-query/use-query'
import { twMerge } from 'tailwind-merge'
import { useProductsStoreActions, useProductsStoreSelectedCategoryId } from '../../store'
import { CATEGORY_FILTER_CATEGORIES_DATA_QUERY } from './graphql'

export function CategoryFilter() {
	const { data, isLoading } = useQuery<ICategoryFilterCategoriesDataQuery>(CATEGORY_FILTER_CATEGORIES_DATA_QUERY)

	const selectedCategoryId = useProductsStoreSelectedCategoryId()
	const { setSelectedCategoryId } = useProductsStoreActions()

	if (isLoading)
		return (
			<div className="grid place-items-center py-10">
				<LoadingSpinner />
			</div>
		)

	const categories = data?.categories

	const isAllSelected = selectedCategoryId == null

	const renderAllCategory = () => (
		<li
			key="all"
			className={twMerge('cursor-pointer', isAllSelected && 'border-l-2 border-neon-turquoise')}
			onClick={() => setSelectedCategoryId(null)}
		>
			<button className="px-3 py-1 w-full text-left cursor-pointer border text-white border-white/20">All</button>
		</li>
	)

	const renderCategory = (category: ICategoryFilterCategoriesDataQuery['categories'][number]) => {
		const id = Number(getCategoryId(category))
		const isSelected = selectedCategoryId === id
		return (
			<li
				key={id}
				className={twMerge('cursor-pointer', isSelected && 'border-l-2 border-neon-turquoise ')}
				onClick={() => setSelectedCategoryId(id)}
			>
				<button className="px-3 py-1 w-full text-left cursor-pointer border text-white border-white/20">
					{getCategoryName(category)}
				</button>
			</li>
		)
	}

	return (
		<div className="grid gap-2">
			<h2 className="text-xl  text-neon-turquoise">Categories</h2>
			<ul className="grid">
				{renderAllCategory()}
				{categories?.map(renderCategory)}
			</ul>
		</div>
	)
}
