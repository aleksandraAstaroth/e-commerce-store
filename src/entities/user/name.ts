import { IUserNameDataFragment } from '@/generated/schema-types'

export function getUserName(data: IUserNameDataFragment | null | undefined) {
	return data?.name
}
