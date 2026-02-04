import { SVGProps } from 'react'

export function BaseIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
			{children}
		</svg>
	)
}
