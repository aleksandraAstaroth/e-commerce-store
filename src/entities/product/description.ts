import { IProductDescriptionDataFragment } from '@/generated/schema-types'

export function getProductDescription(data: IProductDescriptionDataFragment | null | undefined) {
	return data?.description
}
