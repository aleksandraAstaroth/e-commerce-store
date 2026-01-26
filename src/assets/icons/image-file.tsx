import { SVGProps } from 'react'
import { BaseIcon } from './base-icon'

export function ImageFile(props: SVGProps<SVGSVGElement>) {
	return (
		<BaseIcon {...props}>
			<path
				d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM7.6 17.2L9.1 15.2C9.3 14.933 9.7 14.933 9.9 15.2L11 16.667L13.1 13.867C13.3 13.6 13.7 13.6 13.9 13.867L16.4 17.2C16.647 17.53 16.412 18 16 18H8C7.588 18 7.353 17.53 7.6 17.2ZM13 9V3.5L18.5 9H13Z"
				fill="white"
				fill-opacity="0.64"
			/>
		</BaseIcon>
	)
}
