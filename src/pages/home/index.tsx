import { HomeView } from '@/views/home/home'
import { HomeViewLayout } from '@/views/home/layout/layout'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const HomeRoute: NextPageWithLayout = () => {
	return <HomeView />
}

HomeRoute.getLayout = (page: ReactElement) => {
	return <HomeViewLayout>{page}</HomeViewLayout>
}

export default HomeRoute
