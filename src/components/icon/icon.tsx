import { SVGProps } from 'react'
import * as icons from '../../assets/icons'

export type IconType = keyof typeof icons

export interface IIcon {
	src: IconType | null
}

export function Icon({ src, ...rest }: IIcon & Omit<SVGProps<SVGSVGElement>, 'ref'>) {
	if (!src) return null
	const SrcIcon = icons[src]
	return <SrcIcon {...rest} />
}
