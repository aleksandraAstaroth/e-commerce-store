import { ICategoryNameDataFragment } from '@/generated/schema-types'

export function getCategoryName(data: ICategoryNameDataFragment | null | undefined) {
	return data?.name
}
