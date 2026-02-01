import Card from '@/components/card/card'
import { Chip } from '@/components/chip/chip'
import ImageComponent from '@/components/image'
import { getCategoryName } from '@/entities/category/name'
import { IProductCardDataFragment } from '@/generated/schema-types'
import { AddToCartActionButton } from '@/views/cart/components/add-to-cart-action-button/add-to-cart-action-button'
import { getProductId } from '../../id'
import { getProductPrice } from '../../price'
import { getProductTitle } from '../../title'

export function ProductCard({ data }: { data: IProductCardDataFragment | null | undefined }) {
	const imageUrl = data?.images?.[0] ?? ''
	const productId = getProductId(data)

	if (!productId) return null

	return (
		<Card className="grid md:p-4 gap-1 lg:p-7 hover-border-glow-turquoise max-w-[24rem]">
			<div className="relative h-72 w-full">
				{imageUrl && <ImageComponent preload fill src={imageUrl} alt="" className="object-cover aspect-auto" />}
			</div>
			<h3 title={getProductTitle(data)} className="truncate">
				{getProductTitle(data)}
			</h3>
			<Chip>
				<label className="text-xs font-semibold text-gray-500">{getCategoryName(data?.category)}</label>
			</Chip>
			<div className="flex items-center justify-between">
				<div>
					<label className="text-sm font-semibold text-gray-500">Price</label>
					<div className="font-bold">${getProductPrice(data)}</div>
				</div>
				{data && <AddToCartActionButton data={data} />}
			</div>
		</Card>
	)
}
