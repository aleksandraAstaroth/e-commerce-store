import { ReactNode } from 'react'

export function ResponsiveLayout({
	headerSection,
	leftSection,
	rightSection,
}: {
	headerSection?: ReactNode
	leftSection: ReactNode
	rightSection: ReactNode
}) {
	if (headerSection) {
		return (
			<div className="grid grid-cols-[1fr_15rem] max-md:grid-cols-1 gap-10">
				<div className="col-span-2 max-md:col-span-1 h-fit">{headerSection}</div>
				<div className="h-fit max-md:order-2">{leftSection}</div>
				<div className="h-fit max-md:order-1">{rightSection}</div>
			</div>
		)
	}

	// No header
	return (
		<div className="grid grid-cols-[1fr_15rem] max-md:grid-cols-1 gap-10">
			<div className="h-fit">{leftSection}</div>
			<div className="h-fit">{rightSection}</div>
		</div>
	)
}
