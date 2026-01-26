'use client'

import { ReactNode } from 'react'

export function Page({ children }: { children?: ReactNode }) {
	return (
		<div className={`grid overflow-auto  'grid-cols-[auto_1fr] max-lg:grid-cols-1`}>
			<main className="relative bg-surface overflow-y-auto">{children}</main>
		</div>
	)
}
