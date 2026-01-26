import { ReactNode } from 'react'

export function HomeViewLayout({ children }: { children: ReactNode }) {
	return (
		<div className="bg-sky-500">
			<>layout</>
			{children}
		</div>
	)
}
