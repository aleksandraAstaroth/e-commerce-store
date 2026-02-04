import { paths } from '@/helpers/paths/paths'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
	return (
		<main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
			<Image src={'/bogna-gawronska-shop-interior-clothes-2.jpg'} alt="" fill priority className="object-cover" />
			<div className="absolute inset-0 bg-black/80" />

			<div className="relative grid gap-10 justify-center items-center h-full z-10 px-8 text-center">
				<h1 className="text-7xl font-semibold text-neon-pink">hi there! welcome :)</h1>
				<Link
					href={paths.products}
					className="text-2xl w-1/2 mx-auto  text-center border border-neon-turquoise hover:text-neon-turquoise hover-border-glow-turquoise  text-white py-3 rounded-lg "
				>
					View Products
				</Link>
			</div>
		</main>
	)
}
