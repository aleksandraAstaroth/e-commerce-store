import { IProductIdDataFragment } from '@/generated/schema-types'

export function getProductId(data: IProductIdDataFragment | null | undefined) {
	return data?.id
}
