'use client'
import { useParams } from 'next/navigation'

export function useTypedRouterQuery<T>() {
	const query: T = useParams() as T
	return query ?? ({} as T)
}
