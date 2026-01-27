import { ReactNode } from 'react'

export function Layout({ children }: { children: ReactNode }) {
	return <div className="wrapper">{children}</div>
}
