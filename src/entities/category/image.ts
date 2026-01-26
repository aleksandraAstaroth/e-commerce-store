import { ICategoryImageDataFragment } from '@/generated/schema-types'

export function getCategoryImage(data: ICategoryImageDataFragment | null | undefined) {
	return data?.image
}
