import { SVGProps } from 'react'

export function BaseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" {...props}>
			{props.children}
		</svg>
	)
}
