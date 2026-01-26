import { HomeViewLayout } from '@/views/products/layout/layout'
import { ProductsView } from '@/views/products/products'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const ProductsRoute: NextPageWithLayout = () => {
	return <ProductsView />
}

ProductsRoute.getLayout = (page: ReactElement) => {
	return <HomeViewLayout>{page}</HomeViewLayout>
}

export default ProductsRoute
