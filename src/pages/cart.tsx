import { CartView } from '@/views/cart/cart'
import { Layout } from '@/views/layout/layout'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const CartRoute: NextPageWithLayout = () => {
	return <CartView />
}

CartRoute.getLayout = (page: ReactElement) => {
	return <Layout>{page}</Layout>
}

export default CartRoute
