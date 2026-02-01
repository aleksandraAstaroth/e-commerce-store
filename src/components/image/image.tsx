'use client'
import Image, { ImageProps } from 'next/image'
import { ReactEventHandler, useState } from 'react'
import Icon from '../icon'

export function ImageComponent({
	src,
	alt,
	...props
}: { src: string; alt: string; unoptimized?: boolean } & Omit<ImageProps, 'src' | 'alt'>) {
	const [showFallback, setShowFallback] = useState(false)
	if (!src) return null

	const handleError: ReactEventHandler<HTMLImageElement | HTMLVideoElement> = () => {
		setShowFallback(true)
	}
	const imageUrl = src ?? null

	if (showFallback || !imageUrl) {
		const iconSrc = 'ImageFile'
		return (
			<div className="flex h-full w-full items-center justify-center bg-gray-500 bg-cover bg-center">
				<Icon src={iconSrc} />
			</div>
		)
	}

	return <Image {...props} src={src} alt={alt} unoptimized onError={handleError} />
}
