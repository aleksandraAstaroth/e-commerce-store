import Card from '@/components/card/card'
import ImageComponent from '@/components/image'
import { IProductCardDataFragment } from '@/generated/schema-types'
import { getProductPrice } from '../../price'
import { getProductTitle } from '../../title'

export function ProductCard({ data }: { data: IProductCardDataFragment | null | undefined }) {
	const imageUrl = data?.images?.[0] ?? ''
	return (
		<Card className="grid md:p-4 gap-1 lg:p-7 hover-border-glow-turquoise max-w-[24rem]">
			<div className="relative h-72 w-full">
				{imageUrl && <ImageComponent preload fill src={imageUrl} alt="" className="object-cover aspect-auto" />}
			</div>
			<h3 title={getProductTitle(data)} className="truncate">
				{getProductTitle(data)}
			</h3>
			<div>
				<label className="text-sm font-semibold text-gray-500">Price</label>
				<div className="font-bold">${getProductPrice(data)}</div>
			</div>
		</Card>
	)
}
