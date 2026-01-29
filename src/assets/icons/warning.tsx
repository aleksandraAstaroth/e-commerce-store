import { SVGProps } from 'react'
import { BaseIcon } from './base-icon'

export function Warning(props: SVGProps<SVGSVGElement>) {
	return (
		<BaseIcon {...props}>
			<path d="M22.556 10.928l-9.483-9.483c-.573-.573-1.573-.573-2.145 0l-9.483 9.483a1.517 1.517 0 000 2.145l9.483 9.483c.286.286.667.444 1.072.444s.786-.158 1.073-.444l9.483-9.483a1.517 1.517 0 000-2.145zM12.5 17h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5zm0-4h-1a.5.5 0 01-.5-.5v-5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v5a.5.5 0 01-.5.5z"></path>
		</BaseIcon>
	)
}
