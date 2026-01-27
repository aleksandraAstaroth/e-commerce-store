import { SVGProps } from 'react'
import { BaseIcon } from './base-icon'

export function ShoppingCart(props: SVGProps<SVGSVGElement>) {
	return (
		<BaseIcon {...props}>
			<path d="M3.742 2l-1.74.014a1 1 0 10.014 2l1.07-.008 3.293 7.902-1.197 1.914C4.343 15.161 5.362 17 6.942 17H18a1 1 0 100-2H6.941c-.11 0-.124-.022-.064-.117a1 1 0 00.002 0L8.055 13h7.466a2 2 0 001.749-1.03l3.601-6.486A.999.999 0 0019.998 4H5.25l-.576-1.385A1 1 0 003.742 2zM7 18a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2zm10 0a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2z"></path>
		</BaseIcon>
	)
}
