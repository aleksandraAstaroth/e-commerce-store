import { ICategoryIdDataFragment } from '@/generated/schema-types'

export function getCategoryId(data: ICategoryIdDataFragment | null | undefined) {
	return data?.id
}
