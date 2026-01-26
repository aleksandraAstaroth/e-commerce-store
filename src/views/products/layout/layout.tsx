import { ReactNode } from 'react'

export function HomeViewLayout({ children }: { children: ReactNode }) {
	return <div className="wrapper">{children}</div>
}
