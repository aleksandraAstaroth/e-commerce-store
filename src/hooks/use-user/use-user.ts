import { useSession } from 'next-auth/react'

export function useUser() {
	const { status, data } = useSession()
	const user = data?.user
	return { status, user }
}
