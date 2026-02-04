import { IUserAvatarDataFragment } from '@/generated/schema-types'

export function getUserAvatar(data: IUserAvatarDataFragment | null | undefined) {
	return data?.avatar
}
