import { IUserIdDataFragment } from '@/generated/schema-types'

export function getUserId(data: IUserIdDataFragment | null | undefined) {
	return data?.id
}
