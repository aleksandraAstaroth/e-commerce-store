import { SVGProps } from 'react'
import { BaseIcon } from './base-icon'

export function User(props: SVGProps<SVGSVGElement>) {
	return (
		<BaseIcon {...props}>
			<path d="M12 3a4 4 0 00-4 4 4 4 0 004 4 4 4 0 004-4 4 4 0 00-4-4zm0 11c-3.004 0-9 1.508-9 4.5V20a1 1 0 001 1h16a1 1 0 001-1v-1.5c0-2.992-5.996-4.5-9-4.5z"></path>
		</BaseIcon>
	)
}
